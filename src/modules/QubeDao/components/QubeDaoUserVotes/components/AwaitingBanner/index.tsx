import * as React from 'react'
import { DateTime } from 'luxon'
import { useIntl } from 'react-intl'

import { useQubeDaoEpochStore } from '@/modules/QubeDao/providers/QubeDaoEpochStoreProvider'
import TransactionsListEmptyBg from '@/modules/Transactions/assets/TransactionsListEmptyBg.png'

export function AwaitingBanner(): JSX.Element {
    const intl = useIntl()

    const epochStore = useQubeDaoEpochStore()

    return (
        <div className="card card--flat card--small text-center">
            <h3>
                {intl.formatMessage({
                    id: 'QUBE_DAO_VOTE_AWAITING_BANNER_TITLE',
                }, {
                    date: DateTime.fromSeconds(epochStore.voteStart ?? 0)
                        .toUTC(DateTime.local().offset)
                        .toFormat('dd.LL'),
                    offset: DateTime.fromSeconds(epochStore.voteStart ?? 0)
                        .toUTC(DateTime.local().offset)
                        .toFormat('ZZ'),
                    time: DateTime.fromSeconds(epochStore.voteStart ?? 0)
                        .toUTC(DateTime.local().offset)
                        .toFormat('HH:mm'),
                })}
            </h3>
            <p className="margin-bottom">
                {intl.formatMessage({ id: 'QUBE_DAO_VOTE_AWAITING_BANNER_NOTE' })}
            </p>
            <img className="margin-auto" src={TransactionsListEmptyBg} alt="" />
        </div>
    )
}
