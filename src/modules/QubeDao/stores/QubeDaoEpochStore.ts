import BigNumber from 'bignumber.js'
import { computed, makeObservable, reaction } from 'mobx'
import type { IReactionDisposer } from 'mobx'
import { DateTime } from 'luxon'

import { useQubeDaoApi } from '@/modules/QubeDao/hooks/useApi'
import { QubeDaoStore } from '@/modules/QubeDao/stores/QubeDaoStore'
import type { GaugeItem, QubeDaoEpochVotesSumResponse } from '@/modules/QubeDao/types'
import { BaseStore } from '@/stores/BaseStore'
import { error, isGoodBignumber } from '@/utils'

export type QubeDaoEpochStoreData = {
    distributionScheme: string[];
    epochEnd: number | null;
    epochNum?: number;
    epochStart: number | null;
    epochVotesSummary: QubeDaoEpochVotesSumResponse[];
    gaugesDetails: { [gaugeAddress: string]: GaugeItem['poolTokens'] };
    maxGaugesPerVote: number;
    maxVotesRatio?: string;
    minVotesRatio?: string;
    normalizedDistribution: { [gaugeAddress: string]: string };
    totalDistribution: string;
    totalVeAmount: string;
    userTotalVoteAmount?: string;
    voteEnd: number | null;
    voteStart: number | null;
}

export type QubeDaoEpochStoreState = {
    isFetchingEpoch?: boolean;
    isFetchingGaugesDetails?: boolean;
    isFetchingTokenPrice?: boolean;
    isFetchingVotesSummary?: boolean;
    isFetchingUserVoteState?: boolean;
    isInitializing: boolean;
    voteAvailable: boolean;
    votingEndAvailable: boolean;
}

export type QubeDaoEpochStoreCtorOptions = {
    epochNum?: number;
}


export class QubeDaoEpochStore extends BaseStore<QubeDaoEpochStoreData, QubeDaoEpochStoreState> {

    protected readonly api = useQubeDaoApi()

    constructor(
        protected readonly dao: QubeDaoStore,
        protected readonly options?: QubeDaoEpochStoreCtorOptions,
    ) {
        super()

        this.setData(() => ({
            distributionScheme: [],
            epochNum: options?.epochNum,
            epochVotesSummary: [],
            gaugesDetails: {},
            normalizedDistribution: {},
        }))

        this.setState({
            voteAvailable: false,
            votingEndAvailable: false,
        })

        makeObservable(this, {
            distributionPrice: computed,
            distributionScheme: computed,
            epochEnd: computed,
            epochNum: computed,
            epochStart: computed,
            epochTotalVeShare: computed,
            epochVotesAmount: computed,
            epochVotesSummary: computed,
            isFetchingEpoch: computed,
            isFetchingGaugesDetails: computed,
            isFetchingVotesSummary: computed,
            maxVotesRatio: computed,
            minVotesRatio: computed,
            normalizedDistribution: computed,
            totalDistribution: computed,
            totalVeAmount: computed,
            userVoteShare: computed,
            voteAvailable: computed,
            voteEnd: computed,
            voteStart: computed,
            votingEndAvailable: computed,
        })
    }

    public async init(): Promise<void> {
        if (this.state.isInitializing) {
            return
        }

        this.setState('isInitializing', true)

        await this.syncDistributionScheme()

        if (this.data.epochNum) {
            await this.fetchEpoch()
        }
        else {
            await this.fetchLastEpoch()
        }
        await this.syncVotingDetails()
        await this.fetchVotesSummary()
        await this.fetchGaugesDetails()

        this.#initDisposer = reaction(() => this.dao.wallet.address, async (address, prevAddress) => {
            if (address !== undefined && address !== prevAddress) {
                await this.fetchUserVoteState()
            }
        }, { delay: 100, fireImmediately: true })

        this.#veContractDisposer = reaction(() => this.dao.veContractCachedState, async () => {
            try {
                const [
                    currentEpochDetails,
                    votingDetails,
                    currentVotingEntities,
                    distribution,
                ] = await Promise.all([
                    this.dao.veContract
                        .methods.getCurrentEpochDetails({})
                        .call({ cachedState: this.dao.veContractCachedState }),
                    this.dao.veContract
                        .methods.getVotingDetails({})
                        .call({ cachedState: this.dao.veContractCachedState }),
                    (await this.dao.veContract
                        .methods.currentVotingVotes({})
                        .call({ cachedState: this.dao.veContractCachedState }))
                        .currentVotingVotes,
                    (await this.dao.veContract
                        .methods.getNormalizedVoting({})
                        .call({ cachedState: this.dao.veContractCachedState }))
                        ._distribution,
                ])

                if (this.epochNum === parseInt(currentEpochDetails._currentEpoch, 10)) {
                    const now = DateTime.local().toSeconds()
                    const votingEndTime = parseInt(currentEpochDetails._currentVotingEndTime, 10)
                    const votingStartTime = parseInt(currentEpochDetails._currentVotingStartTime, 10)
                    const epochEndTime = parseInt(currentEpochDetails._currentEpochEndTime, 10)
                    const epochStartTime = parseInt(currentEpochDetails._currentEpochStartTime, 10)
                    const timeBeforeVoting = parseInt(votingDetails._timeBeforeVoting, 10)

                    const voteAvailable = (
                        (votingStartTime > 0 && now < votingEndTime)
                        || (votingStartTime === 0 && now > (epochStartTime + timeBeforeVoting))
                    )

                    this.setState({
                        voteAvailable,
                        votingEndAvailable: votingEndTime > 0 && DateTime.local().toSeconds() > votingEndTime,
                    })

                    const epochVotesSummary = currentVotingEntities.reduce<QubeDaoEpochVotesSumResponse[]>(
                        (acc, [gauge, amount]) => {
                            acc.push({
                                gauge: gauge.toString(),
                                totalAmount: amount,
                            })
                            return acc
                        },
                        [],
                    )

                    const normalizedDistribution = distribution.reduce<
                        { [gaugeAddress: string]: string }
                    >((acc, [address, amount]) => {
                        if (acc[address.toString()] === undefined) {
                            acc[address.toString()] = amount
                        }
                        return acc
                    }, {})

                    this.setData({
                        epochEnd: (votingStartTime > epochEndTime || votingEndTime > epochEndTime)
                            ? votingEndTime
                            : epochEndTime,
                        epochVotesSummary,
                        normalizedDistribution,
                        totalVeAmount: currentEpochDetails._currentVotingTotalVotes,
                    })
                }
            }
            catch (e) {

            }
        }, { fireImmediately: true })

        this.setState('isInitializing', false)
    }

    public async dispose(): Promise<void> {
        this.#initDisposer?.()
        this.#veContractDisposer?.()
    }

    public async fetchLastEpoch(force?: boolean, silence: boolean = false): Promise<void> {
        if (!force && this.isFetchingEpoch) {
            return
        }

        this.setState('isFetchingEpoch', !silence)

        try {
            const response = await this.api.epochsLast({}, { method: 'GET' })

            this.setData({
                epochEnd: response.epochEnd,
                epochNum: response.epochNum,
                epochStart: response.epochStart,
                totalDistribution: response.totalDistribution,
                totalVeAmount: response.totalVeAmount,
                voteEnd: response.voteEnd,
                voteStart: response.voteStart,
            })

            if (!isGoodBignumber(response.totalDistribution)) {
                const { distributionSchedule = [] } = await this.dao.veContract
                    .methods.distributionSchedule({})
                    .call({ cachedState: this.dao.veContractCachedState })

                this.setData('totalDistribution', distributionSchedule[(this.epochNum ?? 0) - 1])
            }
        }
        catch (e) {
            error('Fetch last epoch error', e)
        }
        finally {
            this.setState('isFetchingEpoch', false)
        }
    }

    public async fetchEpoch(force?: boolean, silence: boolean = false): Promise<void> {
        if (!force && this.isFetchingEpoch) {
            return
        }

        if (this.options?.epochNum === undefined || Number.isNaN(this.options.epochNum)) {
            return
        }

        this.setState('isFetchingEpoch', !silence)

        try {
            const [response] = (await this.api.epochsSearch({}, { method: 'POST' }, {
                epochNum: this.options.epochNum,
                limit: 1,
                offset: 0,
            })).epochs

            if (!response) {
                return
            }

            this.setData({
                epochEnd: ((response.voteStart ?? 0) > response.epochEnd || (response.voteEnd ?? 0) > response.epochEnd)
                    ? response.voteEnd
                    : response.epochEnd,
                epochNum: response.epochNum,
                epochStart: response.epochStart,
                totalDistribution: response.totalDistribution,
                totalVeAmount: response.totalVeAmount,
                voteEnd: response.voteEnd,
                voteStart: response.voteStart,
            })

            if (!isGoodBignumber(response.totalDistribution)) {
                const { distributionSchedule = [] } = await this.dao.veContract
                    .methods.distributionSchedule({})
                    .call({ cachedState: this.dao.veContractCachedState })

                this.setData('totalDistribution', distributionSchedule[(this.epochNum ?? 0) - 1])
            }
        }
        catch (e) {
            error(`Fetch epoch ${this.epochNum} error`, e)
        }
        finally {
            this.setState('isFetchingEpoch', false)
        }
    }

    protected async fetchUserVoteState(force?: boolean, silence: boolean = false): Promise<void> {
        if (this.data.epochNum === undefined) {
            return
        }

        if (!force && this.isFetchingUserVoteState) {
            return
        }

        this.setState('isFetchingUserVoteState', !silence)

        try {
            const response = (await this.api.epochsVotesSearch({}, { method: 'POST' }, {
                epochNum: this.data.epochNum,
                limit: this.data.maxGaugesPerVote,
                offset: 0,
                userAddress: this.dao.wallet.address,
            })).epochVotes

            this.setData('userTotalVoteAmount', response.reduce(
                (acc, vote) => acc.plus(vote.veAmount ?? 0),
                new BigNumber(0),
            ).toFixed())
        }
        catch (e) {
            error('Fetch votes sum error', e)
        }
        finally {
            this.setState('isFetchingUserVoteState', false)
        }
    }

    protected async fetchVotesSummary(force?: boolean, silence: boolean = false): Promise<void> {
        if (this.data.epochNum === undefined) {
            return
        }

        if (!force && this.isFetchingVotesSummary) {
            return
        }

        this.setState('isFetchingVotesSummary', !silence)

        try {
            const response = await this.api.epochsVotesSum({
                epochNum: this.data.epochNum.toString(),
            }, { method: 'GET' })

            this.setData('epochVotesSummary', response)
        }
        catch (e) {
            error('Fetch votes sum error', e)
        }
        finally {
            this.setState('isFetchingVotesSummary', false)
        }
    }

    protected async fetchGaugesDetails(force?: boolean, silence: boolean = false): Promise<void> {
        if (!force && this.isFetchingGaugesDetails) {
            return
        }

        this.setState('isFetchingGaugesDetails', !silence)

        try {
            const gauges = (await this.dao.veContract
                .methods.gaugeWhitelist({})
                .call({ cachedState: this.dao.veContractCachedState }))
                .gaugeWhitelist
                .map(([address]) => address.toString())

            const response = await this.api.gaugesBatch({}, { method: 'POST' }, {
                gauges,
            })

            this.setData('gaugesDetails', response.gauges.reduce<QubeDaoEpochStoreData['gaugesDetails']>(
                (acc, gauge) => {
                    if (acc[gauge.address] === undefined) {
                        acc[gauge.address] = gauge.poolTokens
                    }
                    return acc
                },
                {},
            ))
        }
        catch (e) {
            error('Fetch gauges details error', e)
        }
        finally {
            this.setState('isFetchingGaugesDetails', false)
        }
    }

    protected async syncVotingDetails(): Promise<void> {
        try {
            const details = await this.dao.veContract
                .methods.getVotingDetails({})
                .call({ cachedState: this.dao.veContractCachedState })

            this.setData({
                maxGaugesPerVote: parseInt(details._maxGaugesPerVote, 10),
                maxVotesRatio: details._gaugeMaxVotesRatio,
                minVotesRatio: details._gaugeMinVotesRatio,
            })
        }
        catch (e) {
            error(e)
        }
    }

    protected async syncDistributionScheme(): Promise<void> {
        try {
            this.setData(
                'distributionScheme',
                (await this.dao.veContract
                    .methods.distributionScheme({})
                    .call({ cachedState: this.dao.veContractCachedState }))
                    .distributionScheme,
            )
        }
        catch (e) {
            error('Sync distribution scheme error', e)
        }
    }

    public get distributionScheme(): QubeDaoEpochStoreData['distributionScheme'] {
        return this.data.distributionScheme
    }

    public get epochEnd(): QubeDaoEpochStoreData['epochEnd'] {
        return this.data.epochEnd
    }

    public get epochNum(): QubeDaoEpochStoreData['epochNum'] {
        return this.data.epochNum
    }

    public get epochStart(): QubeDaoEpochStoreData['epochStart'] {
        return this.data.epochStart
    }

    public get epochVotesSummary(): QubeDaoEpochStoreData['epochVotesSummary'] {
        return this.data.epochVotesSummary
    }

    public get maxVotesRatio(): QubeDaoEpochStoreData['maxVotesRatio'] {
        return this.data.maxVotesRatio
    }

    public get minVotesRatio(): QubeDaoEpochStoreData['minVotesRatio'] {
        return this.data.minVotesRatio
    }

    public get normalizedDistribution(): QubeDaoEpochStoreData['normalizedDistribution'] {
        return this.data.normalizedDistribution
    }

    public get totalDistribution(): QubeDaoEpochStoreData['totalDistribution'] {
        return this.data.totalDistribution
    }

    public get totalVeAmount(): QubeDaoEpochStoreData['totalVeAmount'] {
        return this.data.totalVeAmount
    }

    public get userTotalVoteAmount(): QubeDaoEpochStoreData['userTotalVoteAmount'] {
        return this.data.userTotalVoteAmount
    }

    public get voteEnd(): QubeDaoEpochStoreData['voteEnd'] {
        return this.data.voteEnd
    }

    public get voteStart(): QubeDaoEpochStoreData['voteStart'] {
        return this.data.voteStart
    }

    public get isFetchingEpoch(): QubeDaoEpochStoreState['isFetchingEpoch'] {
        return this.state.isFetchingEpoch
    }

    public get isFetchingGaugesDetails(): QubeDaoEpochStoreState['isFetchingGaugesDetails'] {
        return this.state.isFetchingGaugesDetails
    }

    public get isFetchingUserVoteState(): QubeDaoEpochStoreState['isFetchingUserVoteState'] {
        return this.state.isFetchingUserVoteState
    }

    public get isFetchingVotesSummary(): QubeDaoEpochStoreState['isFetchingVotesSummary'] {
        return this.state.isFetchingVotesSummary
    }

    public get votingEndAvailable(): QubeDaoEpochStoreState['votingEndAvailable'] {
        return this.state.votingEndAvailable
    }

    public get voteAvailable(): QubeDaoEpochStoreState['voteAvailable'] {
        return this.state.voteAvailable
    }

    public get distributionPrice(): string {
        return new BigNumber(this.normalizedTotalDistribution || 0)
            .shiftedBy(-this.dao.tokenDecimals)
            .times(this.dao.tokenPrice ?? 0)
            .toFixed()
    }

    public get normalizedTotalDistribution(): string {
        return new BigNumber(this.totalDistribution || 0)
            .times(this.distributionScheme[0] ?? 1)
            .div(10000)
            .toFixed()
    }

    public get epochVotesAmount(): string {
        return this.epochVotesSummary.reduce(
            (acc, vote) => acc.plus(vote.totalAmount),
            new BigNumber(0),
        ).toFixed()
    }

    public get epochTotalVeShare(): string {
        const value = new BigNumber(this.totalVeAmount || 0)
            .div(this.dao.totalLockedVeAmount || 1)
            .times(100)
            .toFixed()
        return isGoodBignumber(value) ? value : '0'
    }

    public get userVoteShare(): string {
        const value = new BigNumber(this.userTotalVoteAmount || 0)
            .div(this.totalVeAmount || 0)
            .times(100)
        return isGoodBignumber(value) ? value.toFixed() : '0'
    }

    public gaugeDetails(gauge: string): GaugeItem['poolTokens'] | undefined {
        return this.data.gaugesDetails[gauge]
    }

    #initDisposer: IReactionDisposer | undefined

    #veContractDisposer: IReactionDisposer | undefined

}
