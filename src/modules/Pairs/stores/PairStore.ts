import { Time } from 'lightweight-charts'
import { DateTime } from 'luxon'
import { action, makeAutoObservable } from 'mobx'
import uniqBy from 'lodash.uniqby'

import { TokenListURI } from '@/config'
import {
    CandlestickGraphShape,
    CommonGraphShape,
} from '@/modules/Chart/types'
import {
    DEFAULT_PAIR_STORE_DATA,
    DEFAULT_PAIR_STORE_STATE,
} from '@/modules/Pairs/constants'
import {
    PairGraphRequest,
    PairStoreData,
    PairStoreGraphData,
    PairStoreState,
} from '@/modules/Pairs/types'
import { PairsApi, usePairsApi } from '@/modules/Pairs/hooks/useApi'
import { TransactionsRequest } from '@/modules/Transactions/types'
import { getImportedTokens } from '@/stores/TokensCacheService'
import { parseCurrencyBillions } from '@/utils'


export class PairStore {

    /**
     *
     * @protected
     */
    protected data: PairStoreData = DEFAULT_PAIR_STORE_DATA

    /**
     *
     * @protected
     */
    protected state: PairStoreState = DEFAULT_PAIR_STORE_STATE

    protected readonly api: PairsApi = usePairsApi()

    constructor(protected readonly address: string) {
        makeAutoObservable(this, {
            loadOhlcvGraph: action.bound,
            loadTvlGraph: action.bound,
            loadVolumeGraph: action.bound,
        })
    }

    /**
     * @template {extends keyof PairStoreData} K
     * @param {K} key
     * @param {PairStoreData[K]} value
     */
    public changeData<K extends keyof PairStoreData>(key: K, value: PairStoreData[K]): void {
        this.data[key] = value
    }

    /**
     *
     * @template {extends keyof PairStoreData} K
     * @param {K} key
     * @param {PairStoreState[K]} value
     */
    public changeState<K extends keyof PairStoreState>(key: K, value: PairStoreState[K]): void {
        this.state[key] = value
    }

    /**
     *
     * @template {extends keyof PairStoreGraphData} K
     * @param {K} key
     * @param {PairStoreGraphData[K]} value
     * @protected
     */
    protected changeGraphData<K extends keyof PairStoreGraphData>(key: K, value: PairStoreGraphData[K]): void {
        this.data.graphData[key] = value
    }

    /**
     *
     */
    public get isLoading(): PairStoreState['isLoading'] {
        return this.state.isLoading
    }

    /**
     *
     */
    public async load(): Promise<void> {
        if (this.isLoading) {
            return
        }

        try {
            this.changeState('isLoading', true)

            const result = await this.api.pair({
                address: this.address,
            })

            this.changeData('pair', result)
        }
        catch (e) {}
        finally {
            this.changeState('isLoading', false)
        }
    }

    /**
     *
     */
    public get pair(): PairStoreData['pair'] {
        return this.data.pair
    }

    /**
     *
     */
    public get formattedTvl(): string | undefined {
        return this.pair?.tvl
            ? parseCurrencyBillions(this.pair?.tvl)
            : undefined
    }

    /**
     *
     */
    public get formattedVolume24h(): string | undefined {
        return this.pair?.volume24h
            ? parseCurrencyBillions(this.pair?.volume24h)
            : undefined
    }

    /**
     *
     */
    public get formattedFees24h(): string | undefined {
        return this.pair?.fee24h
            ? parseCurrencyBillions(this.pair?.fee24h)
            : undefined
    }

    /**
     *
     */
    public get isOhlcvGraphLoading(): PairStoreState['isOhlcvGraphLoading'] {
        return this.state.isOhlcvGraphLoading
    }

    /**
     *
     * @param {number} [from]
     * @param {number} [to]
     */
    public async loadOhlcvGraph(from?: number, to?: number): Promise<void> {
        if (this.isOhlcvGraphLoading) {
            return
        }

        try {
            this.changeState('isOhlcvGraphLoading', true)

            const body: PairGraphRequest = {
                from: from || DateTime.local().minus({
                    days: this.timeframe === 'D1' ? 30 : 7,
                }).toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
                timeframe: this.timeframe,
                to: to || DateTime.local().toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
            }
            const result = await this.api.pairOhlcv({
                address: this.address,
            }, {
                body: JSON.stringify(body),
            })
            const data = result.concat(this.graphData.ohlcv ?? [])
            this.changeGraphData('ohlcv', data.length ? data : null)
        }
        catch (e) {}
        finally {
            this.changeState('isOhlcvGraphLoading', false)
        }
    }

    /**
     *
     */
    public get isTvlGraphLoading(): PairStoreState['isTvlGraphLoading'] {
        return this.state.isTvlGraphLoading
    }

    /**
     *
     * @param {number} [from]
     * @param {number} [to]
     */
    public async loadTvlGraph(from?: number, to?: number): Promise<void> {
        if (this.isTvlGraphLoading) {
            return
        }

        try {
            this.changeState('isTvlGraphLoading', true)

            const body: PairGraphRequest = {
                from: from || DateTime.local().minus({
                    days: this.timeframe === 'D1' ? 30 : 7,
                }).toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
                timeframe: this.timeframe,
                to: to || DateTime.local().toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
            }
            const result = await this.api.pairTvl({
                address: this.address,
            }, {
                body: JSON.stringify(body),
            })
            const data = result.concat(this.graphData.tvl ?? [])
            this.changeGraphData('tvl', data.length ? data : null)
        }
        catch (e) {}
        finally {
            this.changeState('isTvlGraphLoading', false)
        }
    }

    /**
     *
     */
    public get isVolumeGraphLoading(): PairStoreState['isVolumeGraphLoading'] {
        return this.state.isVolumeGraphLoading
    }

    /**
     *
     * @param {number} [from]
     * @param {number} [to]
     */
    public async loadVolumeGraph(from?: number, to?: number): Promise<void> {
        if (this.isVolumeGraphLoading) {
            return
        }

        try {
            this.changeState('isVolumeGraphLoading', true)

            const body: PairGraphRequest = {
                from: from || DateTime.local().minus({
                    days: this.timeframe === 'D1' ? 30 : 7,
                }).toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
                timeframe: this.timeframe,
                to: to || DateTime.local().toUTC(undefined, {
                    keepLocalTime: false,
                }).toMillis(),
            }
            const result = await this.api.pairVolume({
                address: this.address,
            }, {
                body: JSON.stringify(body),
            })
            const data = result.concat(this.graphData.volume ?? [])
            this.changeGraphData('volume', data.length ? data : null)
        }
        catch (e) {}
        finally {
            this.changeState('isVolumeGraphLoading', false)
        }
    }

    /**
     *
     */
    public get timeframe(): PairStoreState['timeframe'] {
        return this.state.timeframe
    }

    /**
     *
     */
    public get graph(): PairStoreState['graph'] {
        return this.state.graph
    }

    /**
     *
     */
    public get graphData(): PairStoreData['graphData'] {
        return this.data.graphData
    }

    /**
     *
     */
    public get ohlcvGraphData(): CandlestickGraphShape[] {
        return uniqBy(this.graphData.ohlcv, 'timestamp').map<CandlestickGraphShape>(item => ({
            close: parseFloat(item.close),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            open: parseFloat(item.open),
            time: (item.timestamp / 1000) as Time,
        }))
    }

    /**
     *
     */
    public get ohlcvGraphInverseData(): CandlestickGraphShape[] {
        return this.ohlcvGraphData.map<CandlestickGraphShape>(item => ({
            ...item,
            close: item.open,
            high: item.low,
            low: item.high,
            open: item.close,
        }))
    }

    /**
     *
     */
    public get volumeGraphData(): CommonGraphShape[] {
        return uniqBy(this.graphData.volume, 'timestamp').map<CommonGraphShape>(item => ({
            time: (item.timestamp / 1000) as Time,
            value: parseFloat(item.data),
        }))
    }

    /**
     *
     */
    public get tvlGraphData(): CommonGraphShape[] {
        return uniqBy(this.graphData.tvl, 'timestamp').map<CommonGraphShape>(item => ({
            time: (item.timestamp / 1000) as Time,
            value: parseFloat(item.data),
        }))
    }

    /**
     *
     */
    public get isTransactionsLoading(): PairStoreState['isTransactionsLoading'] {
        return this.state.isTransactionsLoading
    }

    /**
     *
     */
    public async loadTransactions(): Promise<void> {
        if (this.isTransactionsLoading) {
            return
        }

        try {
            this.changeState('isTransactionsLoading', true)

            const body: TransactionsRequest = {
                currencyAddresses: getImportedTokens(),
                limit: this.transactionsLimit,
                offset: this.transactionsCurrentPage >= 1
                    ? (this.transactionsCurrentPage - 1) * this.transactionsLimit
                    : 0,
                ordering: this.transactionsOrdering,
                poolAddress: this.address,
                whiteListUri: TokenListURI,
            }
            if (this.transactionsEvents.length > 0) {
                body.eventType = this.transactionsEvents
            }

            const result = await this.api.transactions({}, {
                body: JSON.stringify(body),
            })

            this.changeData('transactionsData', result)
        }
        catch (e) {}
        finally {
            this.changeState('isTransactionsLoading', false)
        }
    }

    /**
     *
     */
    public get transactions(): PairStoreData['transactionsData']['transactions'] {
        return this.data.transactionsData.transactions
    }

    /**
     *
     */
    public get transactionsCurrentPage(): PairStoreState['transactionsCurrentPage'] {
        return this.state.transactionsCurrentPage
    }

    /**
     *
     */
    public get transactionsEvents(): PairStoreState['transactionsEventsType'] {
        return this.state.transactionsEventsType
    }

    /**
     *
     */
    public get transactionsLimit(): PairStoreState['transactionsLimit'] {
        return this.state.transactionsLimit
    }

    /**
     *
     */
    public get transactionsOrdering(): PairStoreState['transactionsOrdering'] {
        return this.state.transactionsOrdering
    }

    /**
     *
     */
    public get transactionsTotalPages(): PairStoreData['transactionsData']['totalCount'] {
        return Math.ceil(this.data.transactionsData.totalCount / this.transactionsLimit)
    }

    /*
     * Internal reaction disposers
     * ----------------------------------------------------------------------------------
     */

}
