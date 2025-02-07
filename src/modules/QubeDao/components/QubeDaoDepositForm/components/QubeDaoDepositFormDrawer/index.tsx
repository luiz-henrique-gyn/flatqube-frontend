import * as React from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/common/Button'
import { Drawer, DrawerRef } from '@/components/common/Drawer'
import { Icon } from '@/components/common/Icon'
import { QubeDaoDepositForm } from '@/modules/QubeDao/components/QubeDaoDepositForm/components/QubeDaoDepositForm'
import { QubeDaoDepositFormStoreProvider } from '@/modules/QubeDao/providers/QubeDaoDepositFormStoreProvider'
import { useQubeDaoContext } from '@/modules/QubeDao/providers/QubeDaoProvider'

import styles from './index.module.scss'

type Props = {
    onDepositSuccess?: () => void;
}

export function QubeDaoDepositFormDrawer({ onDepositSuccess: onDepositSuccessCallback }: Props): JSX.Element {
    const intl = useIntl()

    const daoContext = useQubeDaoContext()

    const drawer = React.useRef<DrawerRef | null>(null)

    const expand = () => {
        drawer.current?.expand()
    }

    const collapse = () => {
        drawer.current?.collapse()
    }

    const onDepositSuccess = () => {
        onDepositSuccessCallback?.()
    }

    return (
        <QubeDaoDepositFormStoreProvider
            onSend={collapse}
            onTransactionSuccess={onDepositSuccess}
        >
            <div className={styles.deposit_form_drawer}>
                <div className={styles.deposit_form_drawer__grid}>
                    <div className="text-bold">
                        {intl.formatMessage({
                            id: 'QUBE_DAO_DEPOSIT_FORM_BOOST_HINT',
                        })}
                    </div>
                    <div>
                        <Button type="primary" onClick={expand}>
                            {intl.formatMessage({
                                id: 'QUBE_DAO_DEPOSIT_FORM_BOOST_BTN_TEXT',
                            })}
                        </Button>
                    </div>
                </div>
                <Drawer
                    ref={drawer}
                    className={styles.deposit_form_drawer_body}
                    closable
                    destroyOnClose
                    height="480px"
                    width="100vw"
                    placement="bottom"
                >
                    <div className="device-drawer-content-inner">
                        <div className="device-drawer-header margin-bottom">
                            <div className="device-drawer-header-inner width-expand">
                                <h4 className="device-drawer-title width-expand">
                                    {intl.formatMessage(
                                        { id: 'QUBE_DAO_DEPOSIT_FORM_CARD_TITLE' },
                                        { symbol: daoContext.tokenSymbol },
                                    )}
                                </h4>
                                <Button
                                    type="icon"
                                    className="btn-close-drawer"
                                    onClick={collapse}
                                >
                                    <Icon icon="close" />
                                </Button>
                            </div>
                        </div>
                        <QubeDaoDepositForm />
                    </div>
                </Drawer>
            </div>
        </QubeDaoDepositFormStoreProvider>
    )
}
