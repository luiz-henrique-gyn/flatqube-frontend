import * as React from 'react'
import { Settings } from 'luxon'
import { IntlProvider } from 'react-intl'
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Observer } from 'mobx-react-lite'

import { ScrollManager } from '@/components/layout/ScrollManager'
import { Footer } from '@/components/layout/Footer'
import { TokensUpgradeModal } from '@/components/common/TokensUpgradeModal'
import { WalletConnectingModal } from '@/components/common/WalletConnectingModal'
import { WalletUpdateModal } from '@/components/common/WalletUpdateModal'
import { Header } from '@/components/layout/Header'
import { LocalizationContext } from '@/context/Localization'
import Builder from '@/pages/builder'
import CreateToken from '@/pages/builder/create'
import CustomToken from '@/pages/builder/token'
import Farming from '@/pages/farming'
import FarmingItem from '@/pages/farming/item'
import CreateFarmPool from '@/pages/farming/create'
import DAO from '@/pages/dao'
import Balance from '@/pages/dao/balance'
import Epoch from '@/pages/dao/epoch'
import Pairs from '@/pages/pairs'
import Pair from '@/pages/pairs/item'
import AddLiquidityPool from '@/pages/pool'
import Swap from '@/pages/swap'
import Tokens from '@/pages/tokens'
import Token from '@/pages/tokens/item'
import Pools from '@/pages/pools'
import Pool from '@/pages/pools/item'
import GaugesCreate from '@/pages/gauges/create'
import GaugesList from '@/pages/gauges/index'
import GaugesItem from '@/pages/gauges/item'
import BurnLiquidity from '@/pages/pools/burn-liquidity'
import { appRoutes } from '@/routes'
import { useUpgradeTokens } from '@/stores/UpgradeTokens'
import { useWallet } from '@/stores/WalletService'
import { noop } from '@/utils'

import './App.scss'


export function App(): JSX.Element {
    const wallet = useWallet()
    const upgradeTokens = useUpgradeTokens()
    const localization = React.useContext(LocalizationContext)

    React.useEffect(() => {
        Settings.defaultLocale = localization.locale
    }, [localization.locale])

    return (
        <IntlProvider
            key="intl"
            locale={localization.locale}
            defaultLocale="en"
            messages={localization.messages}
            onError={noop}
        >
            <Router>
                <ScrollManager>
                    <div className="wrapper">
                        <Header key="header" />

                        <main className="main">
                            <Switch>
                                <Route exact path="/">
                                    <Redirect exact to={appRoutes.swap.makeUrl()} />
                                </Route>

                                <Route path={appRoutes.swap.path}>
                                    <Swap />
                                </Route>

                                <Route exact path={appRoutes.poolList.path}>
                                    <Pools />
                                </Route>
                                <Route exact path={appRoutes.poolRemoveLiquidity.path}>
                                    <BurnLiquidity />
                                </Route>
                                <Route exact path={appRoutes.poolItem.path}>
                                    <Pool />
                                </Route>
                                <Route exact path={appRoutes.poolCreate.path}>
                                    <AddLiquidityPool />
                                </Route>

                                <Route exact path={appRoutes.tokenList.path}>
                                    <Tokens />
                                </Route>
                                <Route exact path={appRoutes.tokenItem.path}>
                                    <Token />
                                </Route>

                                <Route exact path={appRoutes.pairList.path}>
                                    <Pairs />
                                </Route>
                                <Route exact path={appRoutes.pairItem.path}>
                                    <Pair />
                                </Route>

                                <Route exact path={appRoutes.farming.path}>
                                    <Farming />
                                </Route>
                                <Route exact path={appRoutes.farmingCreate.path}>
                                    <CreateFarmPool />
                                </Route>
                                <Route exact path={appRoutes.farmingItem.path}>
                                    <FarmingItem />
                                </Route>
                                <Route exact path={appRoutes.farmingItemUser.path}>
                                    <FarmingItem />
                                </Route>

                                <Route exact path={appRoutes.dao.path}>
                                    <DAO />
                                </Route>
                                <Route exact path={appRoutes.daoEpoch.path}>
                                    <Epoch />
                                </Route>
                                <Route exact path={appRoutes.daoBalance.path}>
                                    <Balance />
                                </Route>

                                <Route exact path={appRoutes.gauges.path}>
                                    <GaugesList />
                                </Route>
                                <Route exact path={appRoutes.gaugesCreate.path}>
                                    <GaugesCreate />
                                </Route>
                                <Route exact path={appRoutes.gaugesItem.path}>
                                    <GaugesItem />
                                </Route>

                                <Route exact path={appRoutes.builder.path}>
                                    <Builder />
                                </Route>
                                <Route path={appRoutes.builderCreate.path}>
                                    <CreateToken />
                                </Route>
                                <Route exact path={appRoutes.builderItem.path}>
                                    <CustomToken />
                                </Route>
                            </Switch>
                        </main>
                        <Footer key="footer" />
                    </div>
                </ScrollManager>
            </Router>
            <ToastContainer />
            <Observer>
                {() => (
                    <>
                        {wallet.isConnecting && (
                            <WalletConnectingModal />
                        )}
                        {wallet.isInitialized && wallet.isOutdated ? (
                            <WalletUpdateModal />
                        ) : null}

                        {upgradeTokens.hasTokensToUpgrade ? (
                            <TokensUpgradeModal />
                        ) : null}
                    </>
                )}
            </Observer>
        </IntlProvider>
    )
}
