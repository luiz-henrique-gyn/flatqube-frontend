import {
    PoolData,
    PoolStoreData,
    PoolStoreState,
} from '@/modules/Pool/types'


export const DEFAULT_POOL_STORE_DATA: PoolStoreData = {
    leftAmount: '',
    rightAmount: '',
}

export const DEFAULT_POOL_STORE_STATE: PoolStoreState = {
    isAutoExchangeEnabled: false,
    isDepositingLeft: false,
    isDepositingLiquidity: false,
    isDepositingLp: false,
    isDepositingRight: false,
    isPreparing: false,
    isSyncPairBalances: false,
    isSyncPairRoots: false,
    isSyncPairType: false,
    isWithdrawingLeft: false,
    isWithdrawingLiquidity: false,
    isWithdrawingRight: false,
}

export const DEFAULT_POOL_DATA: PoolData = {
    isPoolEmpty: undefined,
}
