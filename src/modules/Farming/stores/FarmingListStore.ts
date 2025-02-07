import BigNumber from 'bignumber.js'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { Address } from 'everscale-inpage-provider'

import { TokenListURI } from '@/config'
import { Farm } from '@/misc'
import { FarmingApi, useApi } from '@/modules/Farming/hooks/useApi'
import {
    FarmingPoolFilter,
    FarmingPoolsItemResponse,
    FarmingPoolsRequest,
} from '@/modules/Farming/types'
import { useWallet, WalletService } from '@/stores/WalletService'
import { getImportedTokens, TokensCacheService, useTokensCache } from '@/stores/TokensCacheService'
import { FavoritePairs, useFavoriteFarmings } from '@/stores/FavoritePairs'
import { error, lastOfCalls, makeArray } from '@/utils'

type Reward = {
    vested?: string[];
    entitled?: string[];
    loading?: boolean;
}

type State = {
    data: FarmingPoolsItemResponse[];
    rewards: Reward[],
    totalPage: number;
    currentPage: number;
    loading: boolean;
    filter: FarmingPoolFilter;
    query: string;
}

const defaultState: State = Object.freeze({
    currentPage: 1,
    data: [],
    filter: {},
    loading: false,
    rewards: [],
    totalPage: 1,
    query: '',
})

const PAGE_SIZE = 10
const CURRENCY_DELIMITER = '/'

export class FarmingListStore {

    protected state: State = defaultState

    protected lastOfFetchData = lastOfCalls(this.fetchData.bind(this))

    constructor(
        protected api: FarmingApi,
        protected wallet: WalletService,
        protected tokensCache: TokensCacheService,
        protected favoritePairs?: FavoritePairs,
    ) {
        this.lastOfFetchData = lastOfCalls(this.fetchData.bind(this))

        makeAutoObservable(this, {}, { autoBind: true })
    }

    protected params(): FarmingPoolsRequest {
        const { filter, currentPage, query } = this.state
        const [leftCurrency, rightCurrency] = query
            .toUpperCase()
            .split(CURRENCY_DELIMITER)

        return {
            aprGe: filter.aprFrom ? filter.aprFrom : undefined,
            aprLe: filter.aprTo ? filter.aprTo : undefined,
            favoritePoolAddresses: this.favoritePools,
            isActive: (filter.state === 'active' ? true : undefined)
                || (filter.state === 'noActive' ? false : undefined),
            isAwaitingStart: filter.state === 'awaiting' ? true : undefined,
            isLowBalance: this.favoritePairs ? undefined : Boolean(filter.isLowBalance),
            isWithMyFarming: filter.ownerInclude,
            leftAddress: filter.leftRoot,
            leftCurrency: leftCurrency || undefined,
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * (currentPage - 1),
            ordering: 'tvldescending',
            rightAddress: filter.rightRoot,
            rightCurrency: rightCurrency || undefined,
            tvlGe: filter.tvlFrom ? filter.tvlFrom : undefined,
            tvlLe: filter.tvlTo ? filter.tvlTo : undefined,
            userAddress: this.wallet.address,
            whiteCurrencyAddresses: getImportedTokens(),
            whiteListUri: TokenListURI,
        }
    }

    protected async fetchFarmingPools(): Promise<{
        pools: FarmingPoolsItemResponse[],
        total: number,
    }> {
        const result = await this.api.farmingPools({}, {}, this.params())

        return {
            pools: this.favoritePools ? result.favorite_pools_info : result.pools_info,
            total: this.favoritePools ? result.favorite_total_count : result.total_count,
        }
    }

    protected async fetchReward(
        pool: FarmingPoolsItemResponse,
    ): Promise<Reward> {
        if (!this.wallet.address) {
            throw new Error('Wallet must be connected')
        }

        try {
            const userDataAddress = await Farm.userDataAddress(
                new Address(pool.pool_address),
                new Address(this.wallet.address),
            )
            const poolRewardData = await Farm.poolCalculateRewardData(
                new Address(pool.pool_address),
            )
            const reward = await Farm.userPendingReward(
                userDataAddress,
                poolRewardData._accRewardPerShare,
                poolRewardData._lastRewardTime,
                `${pool.farm_end_time ? pool.farm_end_time / 1000 : 0}`,
            )
            const vested = reward._vested.map((item, index) => (
                new BigNumber(item).plus(reward._pool_debt[index]).toFixed()
            ))
            const entitled = reward._entitled

            return { entitled, vested }
        }
        catch (e) {
            error(e)
            return {
                entitled: [],
                vested: [],
            }
        }
    }

    protected async fetchRewards(
        pools: FarmingPoolsItemResponse[],
    ): Promise<void> {
        if (!this.wallet.address) {
            runInAction(() => {
                this.state.rewards = makeArray(pools.length, () => ({
                    entitled: undefined,
                    loading: true,
                    vested: undefined,
                }))
            })
        }

        pools.forEach((pool, index) => {
            (async () => {
                runInAction(() => {
                    this.state.rewards[index] = {
                        entitled: undefined,
                        loading: true,
                        vested: undefined,
                    }
                })

                try {
                    const reward = await this.fetchReward(pool)

                    runInAction(() => {
                        this.state.rewards[index] = {
                            entitled: reward.entitled,
                            loading: false,
                            vested: reward.vested,
                        }
                    })
                }
                catch (e) {
                    error(e)
                    runInAction(() => {
                        this.state.rewards[index] = {
                            loading: false,
                        }
                    })
                }
            })()
        })
    }

    protected async fetchData(): Promise<[
        FarmingPoolsItemResponse[],
        number,
    ]> {
        const { pools, total } = await this.fetchFarmingPools()
        const totalPage = Math.ceil(total / PAGE_SIZE)

        return [pools, totalPage]
    }

    public async getData(): Promise<void> {
        runInAction(() => {
            this.state.loading = true
        })

        const result = await this.lastOfFetchData()

        if (!result) {
            return
        }

        await this.fetchRewards(result[0])

        runInAction(() => {
            [
                this.state.data,
                this.state.totalPage,
            ] = result
            this.state.loading = false
        })

        await this.syncTokens()
    }

    public async syncTokens(): Promise<void> {
        const tokensForSync: string[] = []

        this.state.data.forEach(item => {
            if (item.left_address && item.right_address) {
                if (!this.tokensCache.has(item.left_address) && !tokensForSync.includes(item.left_address)) {
                    tokensForSync.push(item.left_address)
                }

                if (!this.tokensCache.has(item.right_address) && !tokensForSync.includes(item.right_address)) {
                    tokensForSync.push(item.right_address)
                }
            }
            else if (
                !this.tokensCache.has(item.token_root_address)
                && !tokensForSync.includes(item.token_root_address)
            ) {
                tokensForSync.push(item.token_root_address)
            }
            item.reward_token_root_info.forEach(reward => {
                if (
                    !this.tokensCache.has(reward.reward_root_address)
                    && !tokensForSync.includes(reward.reward_root_address)
                ) {
                    tokensForSync.push(reward.reward_root_address)
                }
            })
        })

        try {
            if (tokensForSync.length > 0) {
                await Promise.all(
                    tokensForSync.map(
                        root => this.tokensCache.syncCustomToken(root),
                    ),
                )
            }
        }
        catch (e) {
            error(e)
        }
    }

    public nextPage(): void {
        this.state.currentPage += 1
        this.getData()
    }

    public prevPage(): void {
        this.state.currentPage -= 1
        this.getData()
    }

    public submitPage(page: number): void {
        this.state.currentPage = page
        this.getData()
    }

    public changeFilter(filter: FarmingPoolFilter): void {
        this.state.filter = filter
        this.state.currentPage = 1
        this.getData()
    }

    public changeQuery(value: string): void {
        this.state.query = value
        this.state.currentPage = 1
        this.getData()
    }

    public dispose(): void {
        this.state = defaultState
    }

    public get data(): State['data'] {
        return toJS(this.state.data)
    }

    public get rewards(): Reward[] {
        return toJS(this.state.rewards)
    }

    public get loading(): State['loading'] {
        return this.state.loading
    }

    public get totalPages(): State['totalPage'] {
        return this.state.totalPage
    }

    public get currentPage(): State['currentPage'] {
        return this.state.currentPage
    }

    public get filter(): State['filter'] {
        return toJS(this.state.filter)
    }

    public get query(): State['query'] {
        return this.state.query
    }

    public get favoritePools(): string[] | undefined {
        if (!this.favoritePairs || !this.favoritePairs.isConnected) {
            return undefined
        }

        return this.favoritePairs.addresses
    }

}

const farmingListStore = new FarmingListStore(
    useApi(),
    useWallet(),
    useTokensCache(),
)

const favoriteFarmingListStore = new FarmingListStore(
    useApi(),
    useWallet(),
    useTokensCache(),
    useFavoriteFarmings(),
)

export function useFarmingListStore(): FarmingListStore {
    return farmingListStore
}

export function useFavoriteFarmingListStore(): FarmingListStore {
    return favoriteFarmingListStore
}
