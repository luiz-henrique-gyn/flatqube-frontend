/* eslint-disable */
export default {
    OPEN_IN_EXPLORER: 'Open in explorer',

    NAV_LINK_SOON_HINT: ' soon',
    NAV_LINK_TEXT_SWAP: 'Swap',
    NAV_LINK_TEXT_POOL: 'Pool',
    NAV_LINK_TEXT_TOKENS: 'Tokens',
    NAV_LINK_TEXT_PAIRS: 'Pairs',
    NAV_LINK_TEXT_FARMING: 'Farming',
    NAV_LINK_TEXT_BUILDER: 'Builder',

    WALLET_CONNECTING_POPUP_TITLE: 'Connect to a wallet',
    WALLET_CONNECTING_POPUP_LEAD_WALLET_NAME: 'Crystal Wallet',
    WALLET_CONNECTING_POPUP_LEAD_IN_PROCESS: 'Initializing...',
    WALLET_UPDATING_POPUP_LEAD_IS_OUTDATED: 'Extension version is outdated',
    WALLET_UPDATING_POPUP_NOTE: '<p>Your wallet version is too old. Please update extension at <a href="https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk">chrome.google.com</a> or local, through chrome://extensions/.</p><p>Reload this page after installing the update.</p>',
    WALLET_UPDATING_LINK_TEXT: 'Update Crystal Wallet',
    WALLET_INSTALLATION_LINK_TEXT: 'Install Crystal Wallet',
    WALLET_INSTALLATION_NOTE: '<p>At the moment, only Crystal Wallet supports TON Swap.</p><p>If you haven’t installed the extension yet, you can do it at <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="nofollow noopener noreferrer">chrome.google.com</a></p>',

    WALLET_BALANCE_HINT: '{balance} TON',
    WALLET_BTN_TEXT_CONNECT: 'Connect to a wallet',

    PAGINATION_BEFORE_TEXT: 'Page',
    PAGINATION_PAGE_OF: 'of {totalPages}',

    SWAP_HEADER_TITLE: 'Swap tokens',
    SWAP_SETTINGS_DROP_TITLE: 'Transaction Settings',
    SWAP_SETTINGS_DROP_NOTE: 'Slippage tolerance',
    SWAP_FIELD_TOKEN_WALLET_BALANCE: 'Balance: {balance}',
    SWAP_FIELD_LABEL_LEFT: 'From',
    SWAP_FIELD_LABEL_RIGHT: 'To',
    SWAP_FIELD_BTN_TEXT_SELECT_TOKEN: 'Select a token',
    SWAP_PRICE_LABEL: 'Optimal price',
    SWAP_PRICE_CROSS_EXCHANGE_MODE_LABEL: 'Get a better price',
    SWAP_PRICE_DIRECT_EXCHANGE_MODE_LABEL: 'Back to direct swap',
    SWAP_PRICE_CROSS_EXCHANGE_MODE_ONLY_LABEL: 'Cross-pair swap only',
    SWAP_PRICE_RESULT: '<span>{value}</span><span class="truncate-name">{leftSymbol}</span>per<span class="truncate-name">{rightSymbol}</span>',
    SWAP_BTN_TEXT_SELECT_A_TOKEN: 'Select a token',
    SWAP_BTN_TEXT_ENTER_AN_AMOUNT: 'Enter an amount',
    SWAP_BTN_TEXT_NOT_ENOUGH_LIQUIDITY: 'Not enough liquidity',
    SWAP_BTN_TEXT_INSUFFICIENT_TOKEN_BALANCE: 'Insufficient <s>{symbol}</s> balance',
    SWAP_BTN_TEXT_ROUTE_DOES_NOT_EXIST: 'Route doesn’t exist',
    SWAP_BTN_TEXT_SUBMIT: 'Swap',
    SWAP_BTN_TEXT_CONFIRM_SUBMIT: 'Confirm',
    SWAP_BTN_TEXT_CONFIRMATION_AWAIT: 'Await confirmation...',
    SWAP_BILL_LABEL_ROUTE: 'Route',
    SWAP_BILL_LABEL_SLIPPAGE: 'Slippage tolerance',
    SWAP_BILL_LABEL_MINIMUM_RECEIVE: 'Minimum receive',
    SWAP_BILL_RESULT_MINIMUM_RECEIVE: '<span>{value}</span> {symbol}',
    SWAP_BILL_LABEL_PRICE_IMPACT: 'Price impact',
    SWAP_BILL_RESULT_PRICE_IMPACT: '<span>&lt;{value}%</span>',
    SWAP_BILL_LABEL_FEE: 'Liquidity Provider Fee',
    SWAP_BILL_RESULT_FEE: '<span>{value}</span> {symbol}',
    SWAP_POPUP_CONFORMATION_TITLE: 'Confirm transaction',
    SWAP_TRANSACTION_RECEIPT_POPUP_TITLE_SUCCESS: 'Swap has been completed successfully',
    SWAP_TRANSACTION_RECEIPT_POPUP_TITLE_FAILURE: 'Swap cancelled',
    SWAP_TRANSACTION_RECEIPT_LEAD_SUCCESSFUL_AMOUNT: '+ <span>{value}</span> {symbol}',
    SWAP_TRANSACTION_RECEIPT_LINK_TXT_TOKEN_ROOT_CONTRACT: 'Token root contract',
    SWAP_TRANSACTION_RECEIPT_LINK_TXT_TRANSACTION: 'Transaction result',
    SWAP_TRANSACTION_RECEIPT_CANCELLED_NOTE: '<p>The Swap was canceled. Your balance hasn’t changed.</p>',
    SWAP_TRANSACTION_RECEIPT_CROSS_EXCHANGE_CANCELLED_NOTE: 'Due to the slippage is more than {slippage} of the {leftSymbol}/{rightSymbol} pair, you stayed with {tokenSymbol} token.',

    TOKENS_LIST_POPUP_TITLE: 'Select a token',
    TOKENS_LIST_POPUP_FIELD_SEARCH_PLACEHOLDER: 'Enter a token name or address...',
    TOKENS_LIST_POPUP_NO_RESULTS: 'No results found',
    TOKENS_LIST_POPUP_BTN_TEXT_IMPORT_TOKEN: 'Import',
    TOKENS_LIST_POPUP_IMPORT_TOKEN_TITLE: 'Import token',
    TOKENS_LIST_POPUP_IMPORT_TOKEN_WARNING: 'This token doesn’t appear on the active token list(s). Make sure this is the token that you want to trade.',

    POOL_HEADER_TITLE: 'Add Liquidity',
    POOL_FIELD_TOKEN_WALLET_BALANCE: 'Balance: {balance}',
    POOL_FIELD_LABEL_LEFT: 'Left',
    POOL_FIELD_LABEL_RIGHT: 'Right',
    POOL_FIELD_BTN_TEXT_SELECT_TOKEN: 'Select a token',
    POOL_AUTO_EXCHANGE_TEXT: '<p>Enable auto exchange</p><p>In this case, <b>{leftSymbol}</b> will be automatically exchanged for <b>{rightSymbol}</b> for the missing amount to compensate for the difference.</p>',
    POOL_STEP_NOTE_LEAD_INIT: 'Initializing...',
    POOL_STEP_NOTE_LEAD_CHECK_ACCOUNT: 'Checking account...',
    POOL_STEP_NOTE_LEAD_CHECK_PAIR: 'Checking pool...',
    POOL_STEP_NOTE_LEAD_CONNECT_ACCOUNT: 'Account not connected',
    POOL_STEP_NOTE_LEAD_CONNECTING_ACCOUNT: 'Connecting account...',
    POOL_STEP_NOTE_LEAD_POOL_NOT_EXIST: 'Pool doesn’t exist',
    POOL_STEP_NOTE_LEAD_POOL_NOT_CONNECTED: 'Pool not connected',
    POOL_STEP_NOTE_LEAD_POOL_CONNECTING: 'Pool connecting...',
    POOL_STEP_NOTE_LEAD_POOL_CREATING: 'Creating pool...',
    POOL_STEP_NOTE_LEAD_AWAIT_TRANSACTION: 'Await transaction...',
    POOL_STEP_NOTE_LEAD_SUPPLYING: 'Supplying...',
    POOL_STEP_NOTE_TEXT_CONNECT_ACCOUNT: 'You need to connect account, before you can continue. Account connection for this wallet occurs only once. You will not need to go through this procedure in the future.',
    POOL_STEP_NOTE_TEXT_CONNECTING_ACCOUNT: 'You need to connect account, before you can continue. Account connection for this wallet occurs only once. You will not need to go through this procedure in the future.',
    POOL_STEP_NOTE_TEXT_SELECT_TOKEN: 'You need to select left and right pair token, before you can continue.',
    POOL_STEP_NOTE_TEXT_CREATE_POOL: 'You need to create pool, before you can to continue.',
    POOL_STEP_NOTE_TEXT_CONNECT_POOL: 'You need to connect this pool to your dex account, before you can to continue.',
    POOL_BTN_TEXT_INIT: 'Initializing',
    POOL_BTN_TEXT_CHECK_ACCOUNT: 'Checking...',
    POOL_BTN_TEXT_CONNECT_ACCOUNT: 'Connect account',
    POOL_BTN_TEXT_CONNECTING_ACCOUNT: 'Connecting...',
    POOL_BTN_TEXT_SELECT_PAIR: 'Select tokens',
    POOL_BTN_TEXT_ENTER_AN_AMOUNT: 'Enter an amount',
    POOL_BTN_TEXT_CHECK_PAIR: 'Checking pool...',
    POOL_BTN_TEXT_CREATE_POOL: 'Create pool',
    POOL_BTN_TEXT_CONNECT_POOL: 'Connect pool',
    POOL_BTN_TEXT_CREATING_POOL: 'Creating...',
    POOL_BTN_TEXT_CONNECTING_POOL: 'Connecting...',
    POOL_BTN_TEXT_DEPOSIT_TOKEN: 'Deposit {symbol}',
    POOL_BTN_TEXT_SUPPLY: 'Supply',
    POOL_BTN_TEXT_SUBMIT: 'Submit',
    POOL_DATA_SUBTITLE_DEX_ACCOUNT: 'TON Swap account balance',
    POOL_DEX_DATA_LABEL_LP_TOKENS: 'LP Tokens',
    POOL_DEX_DATA_LABEL_CURRENT_SHARE: 'Current share',
    POOL_DEX_DATA_RESULT_CURRENT_SHARE: '{value}%',
    POOL_DEX_DATA_RESULT_CURRENT_SHARE_LEFT: '{value} {symbol}',
    POOL_DEX_DATA_RESULT_CURRENT_SHARE_RIGHT: '{value} {symbol}',
    POOL_ROOTS_INFO_LABEL_DEX_ADDRESS: 'TON Swap account address',
    POOL_ROOTS_INFO_LABEL_LP_ROOT: 'LP Root address',
    POOL_ROOTS_INFO_LABEL_PAIR_ROOT: 'Pool address',
    POOL_DATA_SUBTITLE_CURRENT_STATE: 'Pool data',
    POOL_DATA_LABEL_LP_SUPPLY: 'LP Supply',
    POOL_DATA_LABEL_LEFT_PRICE: '{leftSymbol} per {rightSymbol}',
    POOL_DATA_LABEL_RIGHT_PRICE: '{rightSymbol} per {leftSymbol}',
    POOL_DATA_LABEL_FEE: 'Fee',
    POOL_DATA_SUBTITLE_AFTER_SUPPLY: 'After supply',
    POOL_DATA_LABEL_SHARE_PERCENT: 'Share',
    POOL_DATA_RESULT_SHARE_PERCENT: '{value}%',
    POOL_DATA_LABEL_SHARE_CHANGE_PERCENT: 'Share change',
    POOL_DATA_RESULT_SHARE_CHANGE_PERCENT: '+ {value}%',
    POOL_DATA_LABEL_NEW_LEFT_PRICE: '{leftSymbol} per {rightSymbol}',
    POOL_DATA_LABEL_NEW_RIGHT_PRICE: '{rightSymbol} per {leftSymbol}',
    POOL_SUPPLY_RECEIPT_POPUP_TITLE: 'Supply receipt',
    POOL_SUPPLY_RECEIPT_LEAD_SUCCESSFUL_AMOUNT: '+ <span>{value}</span> LP',
    POOL_SUPPLY_RECEIPT_SUBTITLE_RESULT: 'Supply result',
    POOL_SUPPLY_RECEIPT_DATA_LABEL_SHARE_PERCENT: 'Share',
    POOL_SUPPLY_RECEIPT_DATA_RESULT_SHARE_PERCENT: '{value}%',
    POOL_SUPPLY_RECEIPT_DATA_LABEL_SHARE_CHANGE_PERCENT: 'Share change',
    POOL_SUPPLY_RECEIPT_DATA_RESULT_SHARE_CHANGE_PERCENT: '+ {value}%',
    POOL_SUPPLY_RECEIPT_DATA_LABEL_NEW_LEFT_PRICE: '{leftSymbol} per {rightSymbol}',
    POOL_SUPPLY_RECEIPT_DATA_LABEL_NEW_RIGHT_PRICE: '{rightSymbol} per {leftSymbol}',
    POOL_SUPPLY_RECEIPT_SUCCESSFUL_NOTE: '<p>Supply completed successfully.</p><p>LP token root <a href="https://ton-explorer.com/accounts/{address}" target="_blank" rel="nofollow noopener noreferrer">contract</a>.</p><p>You can view the result transaction in the <a href="https://ton-explorer.com/transactions/{transactionHash}" target="_blank" rel="nofollow noopener noreferrer">explorer</a>.</p>',
    POOL_SUPPLY_RECEIPT_LEAD_CANCELLED: 'Supply cancelled',
    POOL_SUPPLY_RECEIPT_CANCELLED_NOTE: '<p>The Supply was canceled. Your balance hasn’t changed.</p>',
    POOL_SUPPLY_RECEIPT_POPUP_BTN_TEXT_CLOSE: 'Close',

    FARMING_HEADER_TITLE: 'Farming',
    FARMING_HEADER_CREATE_LINK_TEXT: 'Create farm pool',
    FARMING_HEADER_GUIDE_LINK_TEXT: 'Guide',
    FARMING_LIST_HEADER_TOKEN_CELL: 'Token',
    FARMING_LIST_HEADER_TVL_CELL: 'TVL',
    FARMING_LIST_HEADER_APY_CELL: 'APY',
    FARMING_LIST_HEADER_REWARD_CELL: 'Reward',
    FARMING_LIST_HEADER_SHARE_CELL: 'Share',
    FARMING_LIST_HEADER_POOL_CELL: 'Pool',
    FARMING_LIST_POOL_STATUS_EXPIRED: 'Expired',
    FARMING_LIST_POOL_STATUS_ACTIVE: 'Active',
    FARMING_LIST_POOL_STATUS_AWAITING: 'Awaiting',
    FARMING_LIST_POOL_DETAILS_HEADER_TITLE: 'Farm pool {symbol}',
    FARMING_LIST_POOL_DETAILS_HEADER_SUBTITLE: 'Pool data',
    FARMING_LIST_POOL_DETAILS_FARM_BALANCE: 'Farm balance, {symbol}',
    FARMING_LIST_POOL_DETAILS_FARM_SPEED: 'Farm speed {symbol}/sec',
    FARMING_LIST_POOL_DETAILS_REWARD_BALANCE: 'Reward balance, {symbol}',
    FARMING_LIST_POOL_DETAILS_FARM_START: 'Farm start',
    FARMING_LIST_POOL_DETAILS_FARM_END: 'Farm end',
    FARMING_LIST_POOL_DETAILS_POOL_ADDRESS: 'Pool address',
    FARMING_LIST_POOL_DETAILS_OWNER_ADDRESS: 'Owner address',
    FARMING_LIST_POOL_DETAILS_FARM_TOKEN_ROOT: 'Farm token root',
    FARMING_LIST_POOL_DETAILS_REWARD_TOKEN: 'Reward token root, {symbol}',
    FARMING_POOL_FORM_WALLET_BALANCE_TEXT: 'Your wallet balance {balance} {symbol}',
    FARMING_POOL_FORM_DEPOSIT_AMOUNT_PLACEHOLDER: 'Amount...',
    FARMING_POOL_FORM_MAX_AMOUNT_DEPOSIT_BTN_TEXT: 'Max',
    FARMING_POOL_FORM_DEPOSIT_BTN_TEXT: 'Deposit',
    FARMING_POOL_FORM_DEPOSITING_BTN_TEXT: 'Depositing',
    FARMING_POOL_FORM_CLAIM_BTN_TEXT: 'Claim',
    FARMING_POOL_FORM_DEPOSIT_TOKEN_BTN_TEXT: 'Deposit {symbol}',
    FARMING_POOL_FORM_DEPOSITING_TOKEN_BTN_TEXT: 'Depositing {symbol}',
    FARMING_POOL_FORM_TOKEN_WALLET_BALANCE_TEXT: 'Your {symbol} wallet balance: {amount} {symbol}',
    FARMING_POOL_FORM_ADMIN_TEXT: 'You are the pool administrator. You have access to the functions of deposit and withdrawal of unclaimed balance.',
    FARMING_POOL_FORM_WITHDRAW_UNCLAIMED_BTN_TEXT: 'Withdraw unclaimed',
    FARMING_LIST_USER_DETAILS_HEADER_SUBTITLE: 'User data',
    FARMING_LIST_USER_DETAILS_FARM_USER_BALANCE: 'Farm balance, {symbol}',
    FARMING_LIST_USER_DETAILS_FARM_USER_UNCLAIMED_REWARD: 'Unclaimed reward, {symbol}',
    FARMING_LIST_USER_DETAILS_FARM_CONTRACT_ADDRESS: 'Farm contract address',
    FARMING_CREATE_HEADER_TITLE: 'Create farm pool',
    FARMING_CREATE_FIELD_FARM_TOKEN_ROOT_LABEL: 'Farm token root',
    FARMING_CREATE_FIELD_FARM_TOKEN_ROOT_HINT: 'Address',
    FARMING_CREATE_FIELD_FARM_START_LABEL: 'Farm start',
    FARMING_CREATE_FIELD_FARM_START_HINT: 'YYYY/MM/DD HH:MM',
    FARMING_CREATE_FIELD_FARM_END_LABEL: 'Farm end',
    FARMING_CREATE_FIELD_FARM_END_HINT: 'YYYY/MM/DD HH:MM',
    FARMING_CREATE_FIELD_REWARD_TOKEN_ROOT_LABEL: 'Reward token root',
    FARMING_CREATE_FIELD_REWARD_TOKEN_ROOT_HINT: 'Address',
    FARMING_CREATE_FIELD_TOTAL_REWARD_LABEL: 'Total reward',
    FARMING_CREATE_FIELD_TOTAL_REWARD_HINT: 'Amount',
    FARMING_CREATE_FIELD_TOKEN_TOTAL_REWARD_HINT: 'Amount, {symbol}',
    FARMING_CREATE_ADD_REWARD_TOKEN_LINK_TEXT: 'Add reward token',
    FARMING_CREATE_POOL_SUBTITLE_PARAMS: 'Farm pool params',
    FARMING_CREATE_POOL_PARAMS_FARM_TOKEN: 'Farm token',
    FARMING_CREATE_POOL_PARAMS_FARM_START_LOCAL: 'Start (Local Time)',
    FARMING_CREATE_POOL_PARAMS_FARM_START_UTC: 'Start (UTC)',
    FARMING_CREATE_POOL_PARAMS_FARM_END_LOCAL: 'End (Local Time)',
    FARMING_CREATE_POOL_PARAMS_FARM_END_UTC: 'End (UTC)',
    FARMING_CREATE_POOL_PARAMS_FARM_PERIOD: 'Period length',
    FARMING_CREATE_POOL_PARAMS_FARM_PERIOD_VALUE: '{days, plural, =0 {0 days} one {# day} other {# days}}',
    FARMING_CREATE_POOL_PARAMS_REWARD_TOKEN: 'Reward token #{index}',
    FARMING_CREATE_POOL_PARAMS_REWARD_TOKEN_FARM_SPEED: 'Farm speed #{index}',
    FARMING_CREATE_POOL_PARAMS_REWARD_TOKEN_FARM_SPEED_VALUE: '{value} {symbol}/sec',
    FARMING_CREATE_POOL_PARAMS_REWARD_TOKEN_FARM_DEPOSIT: 'Deposit #{index}',
    FARMING_CREATE_POOL_PARAMS_REWARD_TOKEN_FARM_DEPOSIT_VALUE: '{value} {symbol}',
    FARMING_CREATE_POOL_VALID_STATE_CREATION_NOTE: 'Farm pool creation cost is 7 TON. Gas does not return.',
    FARMING_CREATE_POOL_VALID_STATE_DEPOSIT_NOTE: 'You need to deposit full amount of {tokensDeposits} to pool address before it becomes active.',
    FARMING_CREATE_BTN_TEXT_SUBMIT: 'Create pool',

    CURRENCIES_HEADER_TITLE: 'All tokens',
    CURRENCIES_WATCHLIST_HEADER_TITLE: 'My tokens watchlist',
    CURRENCIES_LIST_HEADER_NAME_CELL: 'Name',
    CURRENCIES_LIST_HEADER_PRICE_CELL: 'Price',
    CURRENCIES_LIST_HEADER_PRICE_CHANGE_CELL: 'Price change',
    CURRENCIES_LIST_HEADER_VOLUME24_CELL: 'Volume 24H',
    CURRENCIES_LIST_HEADER_TVL_CELL: 'TVL',
    CURRENCY_BREADCRUMB_ROOT: 'Tokens',
    CURRENCY_ADD_LIQUIDITY_BTN_TEXT: 'Add Liquidity',
    CURRENCY_TRADE_BTN_TEXT: 'Trade',
    CURRENCY_STATS_TVL_TERM: 'TVL',
    CURRENCY_STATS_VOLUME24_TERM: '24h Trading Volume',
    CURRENCY_STATS_VOLUME7_TERM: '7d Trading Volume',
    CURRENCY_STATS_TRANSACTIONS24_TERM: '24h Transactions',
    CURRENCY_GRAPH_TAB_PRICES: 'Prices',
    CURRENCY_GRAPH_TAB_VOLUME: 'Volume',
    CURRENCY_GRAPH_TAB_TVL: 'TVL',
    CURRENCY_PAIRS_LIST_HEADER_TITLE: 'Pairs',
    CURRENCY_TRANSACTIONS_LIST_HEADER_TITLE: 'Transactions',

    PAIRS_HEADER_TITLE: 'All pairs',
    PAIRS_LIST_HEADER_PAIR_CELL: 'Pair',
    PAIRS_LIST_HEADER_VOLUME24_CELL: 'Volume 24H',
    PAIRS_LIST_HEADER_VOLUME7_CELL: 'Volume 7D',
    PAIRS_LIST_HEADER_TVL_CELL: 'TVL',
    PAIR_BREADCRUMB_ROOT: 'Pairs',
    PAIR_TOKEN_PRICE: '1 {symbolLeft} = {amount} {symbolRight}',
    PAIR_ADD_LIQUIDITY_BTN_TEXT: 'Add Liquidity',
    PAIR_TRADE_BTN_TEXT: 'Trade',
    PAIR_STATS_TTL_TERM: 'Total Tokens Locked',
    PAIR_STATS_TVL_TERM: 'TVL',
    PAIR_STATS_VOLUME24_TERM: '24h Trading Volume',
    PAIR_STATS_FEES24_TERM: '24h Fees',
    PAIR_GRAPH_TAB_VOLUME: 'Volume',
    PAIR_GRAPH_TAB_TVL: 'Liquidity',
    PAIR_TRANSACTIONS_LIST_HEADER_TITLE: 'Transactions',

    BUILDER_HEADER_TITLE: 'Builder',
    BUILDER_HEADER_CREATE_LINK_TEXT: 'Create new token',
    BUILDER_LIST_HEADER_NAME_CELL: 'Name',
    BUILDER_LIST_HEADER_SYMBOL_CELL: 'Symbol',
    BUILDER_LIST_HEADER_DECIMALS_CELL: 'Decimals',
    BUILDER_LIST_HEADER_TOTAL_SUPPLY_CELL: 'Total supply',
    BUILDER_CREATE_HEADER_TITLE: 'Create token',
    BUILDER_CREATE_FIELD_LABEL_NAME: 'Name',
    BUILDER_CREATE_FIELD_LABEL_SYMBOL: 'Symbol',
    BUILDER_CREATE_FIELD_LABEL_DECIMALS: 'Decimals',
    BUILDER_CREATE_FIELD_PLACEHOLDER_NAME: 'Name your token',
    BUILDER_CREATE_FIELD_PLACEHOLDER_SYMBOL: 'Add token symbol',
    BUILDER_CREATE_FIELD_PLACEHOLDER_DECIMALS: 'Set token decimals',
    BUILDER_CREATE_BTN_TEXT_SUBMIT: 'Build',
    BUILDER_CREATE_BTN_TEXT_ENTER_ALL_DATA: 'Enter all data',
    BUILDER_CREATE_TRANSACTION_RECEIPT_POPUP_TITLE: 'Token receipt',
    BUILDER_CREATE_TRANSACTION_RECEIPT_TOKEN_DEPLOYED: 'Token deployed',
    BUILDER_CREATE_TRANSACTION_RECEIPT_SUCCESSFUL_NOTE: '<p>Token {name} deployed successfully.</p><p>{symbol} token root <a href="https://ton-explorer.com/accounts/{address}" target="_blank" rel="nofollow noopener noreferrer">contract</a>.</p><p>You can view the result transaction in the <a href="https://ton-explorer.com/transactions/{transactionHash}" target="_blank" rel="nofollow noopener noreferrer">explorer</a>.</p>',
    BUILDER_CREATE_TRANSACTION_RECEIPT_TOKEN_NOT_DEPLOYED: 'Token not deployed',
    BUILDER_CREATE_TRANSACTION_RECEIPT_BTN_TEXT_CLOSE: 'Close',
    BUILDER_SEARCH_FIELD_PLACEHOLDER: 'Filtering...',
    BUILDER_MESSAGE_TOKEN_NOT_FOUND: 'Token not found',
    BUILDER_MESSAGE_NO_TOKEN: 'You don’t have any token',
    BUILDER_BUTTON_CREATE_TOKEN: 'Create new one',
    BUILDER_MANAGE_TOKEN_HEADER_TITLE: 'Manage token',
    BUILDER_MANAGE_TOKEN_DESCRIPTION_TEXT: 'Description',
    BUILDER_MANAGE_TOKEN_ACTIONS_TEXT: 'Actions',
    BUILDER_MANAGE_TOKEN_CIRCULATING_SUPPLY_TITLE: 'Manage circulating supply',
    BUILDER_MANAGE_TOKEN_MINT_NAME: 'Mint',
    BUILDER_MANAGE_TOKEN_MINT_DESCRIPTION: 'Issue additional tokens to a specific address',
    BUILDER_MANAGE_TOKEN_MINT_BTN_TEXT: 'Mint',
    BUILDER_MANAGE_TOKEN_DANGER_ZONE_TITLE: 'Danger zone',
    BUILDER_MANAGE_TOKEN_TRANSFER_OWNERSHIP_NAME: 'Transfer ownership',
    BUILDER_MANAGE_TOKEN_TRANSFER_OWNERSHIP_DESCRIPTION: 'Set a new token owner',
    BUILDER_MANAGE_TOKEN_TRANSFER_OWNERSHIP_BTN_TEXT: 'Transfer',
    BUILDER_MANAGE_TOKEN_BTN_TEXT_SUBMIT: 'Build',
    BUILDER_MANAGE_TOKEN_BTN_TEXT_ENTER_ALL_DATA: 'Enter all data',
    BUILDER_MANAGE_TOKEN_MINT_POPUP_TITLE: 'Mint tokens',
    BUILDER_MANAGE_TOKEN_MINT_LABEL_TARGET_ADDRESS: 'Target address',
    BUILDER_MANAGE_TOKEN_MINT_LABEL_AMOUNT: 'Amount to mint',
    BUILDER_MANAGE_TOKEN_TRANSFER_BTN_TEXT_SUBMIT: 'Confirm',
    BUILDER_MANAGE_TOKEN_TRANSFER_BTN_TEXT_CANCEL: 'Cancel',
    BUILDER_MANAGE_TOKEN_TRANSFER_POPUP_TITLE: 'Transfer token ownership',
    BUILDER_MANAGE_TOKEN_TRANSFER_LABEL_NEW_OWNER: 'New owner address',
    BUILDER_MANAGE_TOKEN_TRANSFER_TITLE_BALANCE: 'Target address balance',
    BUILDER_MANAGE_TOKEN_TRANSFER_LABEL_SUPPLY: 'Circulating supply',
    BUILDER_MANAGE_TOKEN_TRANSFER_LABEL_CURRENT: 'Current',
    BUILDER_MANAGE_TOKEN_TRANSFER_LABEL_AFTER_MINING: 'After mining',
    BUILDER_MANAGE_TOKEN_TRANSFER_MESSAGE_ENTER_VALID_ADDRESS: 'Enter valid target address',
    BUILDER_MANAGE_TOKEN_TRANSFER_MESSAGE_ENTER_ADDRESS: 'Enter target address',
    BUILDER_MANAGE_TOKEN_TRANSFER_MESSAGE_ENTER_AMOUNT: 'Enter amount to mint',

    TRANSACTIONS_LIST_HEADER_TRANSACTION_CELL: 'Transaction',
    TRANSACTIONS_LIST_HEADER_TOTAL_VALUE_CELL: 'Total value',
    TRANSACTIONS_LIST_HEADER_LEFT_TOKEN_CELL: 'Left token',
    TRANSACTIONS_LIST_HEADER_RIGHT_TOKEN_CELL: 'Right token',
    TRANSACTIONS_LIST_HEADER_ACCOUNT_CELL: 'Account',
    TRANSACTIONS_LIST_HEADER_TIME_CELL: 'Time',
    TRANSACTION_EVENT_DEPOSIT: 'Add {leftSymbol} and {rightSymbol}',
    TRANSACTION_EVENT_WITHDRAW: 'Remove {leftSymbol} and {rightSymbol}',
    TRANSACTION_EVENT_SWAP_LEFT_TO_RIGHT: 'Swap {leftSymbol} to {rightSymbol}',
    TRANSACTION_EVENT_SWAP_RIGHT_TO_LEFT: 'Swap {rightSymbol} to {leftSymbol}',
    TRANSACTIONS_LIST_EVENT_ALL: 'All',
    TRANSACTIONS_LIST_EVENT_SWAPS: 'Swaps',
    TRANSACTIONS_LIST_EVENT_DEPOSIT: 'Adds',
    TRANSACTIONS_LIST_EVENT_WITHDRAW: 'Removes',

}
