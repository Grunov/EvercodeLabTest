export const status = {
    listen: 'listen',
    request: 'request',
    success: 'success',
    error: 'error'
}

// Status mutations
export const _set_status = '_set_status'
export const _set_errors  = 'set_errors'

// Status getters 
export const GET_ERRORS  = 'GET_ERRORS'
export const GET_STATUS = 'GET_STATUS' 

// Auth mutations
export const _set_auth = '_set_auth'
export const _set_user = '_set_user'

// Auth actions
export const SIGNUP    = 'SIGNUP'
export const SIGNIN    = 'SIGNIN'
export const SIGNOUT   = 'SIGNOUT'
export const CHEK_AUTH = 'CHEK_AUTH'

//Auth getters
export const GET_AUTH_STATE = 'GET_AUTH_STATE'
export const GET_USER       = 'GET_USER' 

// Currency mutations
export const _set_currencies  = '_set_currencies'
export const _set_currency    = '_set_currency'
export const _create_currency = '_create_currency'
export const _update_currency = '_update_currency'
export const _delete_currency = '_delete_currency' 

// Currency actions
export const GET_ALL_CURRENCIES_API = 'GET_ALL_CURRENCIES_API'
export const GET_CURRENCY_API       = 'GET_CURRENCY_API'
export const CREATE_CURRENCY_API    = 'CREATE_CURRENCY_API'
export const UPDATE_CURRENCY_API    = 'UPDATE_CURRENCY_API'
export const DELETE_CURRENCY_API    = 'DELETE_CURRENCY_API'

// Currency getters
export const GET_ALL_CURRENCIES = 'GET_ALL_CURRENCIES'
export const GET_CURRENCY   = 'GET_CURRENCY'


