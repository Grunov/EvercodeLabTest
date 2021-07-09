import CurrencyService from '@/services/CurrencyService';

import {
    status,
    _set_status,
    _set_errors,
    _set_currencies,
    _set_currency,
    _create_currency,
    _update_currency,
    _delete_currency,
    GET_ALL_CURRENCIES_API,
    CREATE_CURRENCY_API,
    UPDATE_CURRENCY_API,
    DELETE_CURRENCY_API,
    GET_CURRENCY_API,
    GET_ALL_CURRENCIES,
    GET_CURRENCY,
    GET_ERRORS,
    GET_STATUS
} from '@/store/constants';

export default {
    namespaced: true,
    state: () =>( {
        status: status.listen,
        errors: null,
        currencies: [],
        currency: null
    }),
    mutations: {
        [_set_status](state, status) {
            state.status = status;
        },
        [_set_errors](state, error) {
            state.errors = error?.response?.data;
        },
        [_set_currencies](state, payload) {
            state.currencies = payload;
        },
        [_set_currency](state, payload) {
            state.currency = payload;
        },
        [_create_currency](state, payload) {
            state.currencies.push(payload)
        },
        [_update_currency](state, payload) {
            state.currencies.forEach(currency => {
                if(currency.id === payload.id) {
                    currency = payload
                }
            });
            state.currency = null;
        },
        [_delete_currency](state, id) {
            state.currencies = state.currencies.filter((currency) => currency._id !== id)
        }
    },
    actions: {
        async [GET_ALL_CURRENCIES_API]({commit}) {
            commit(_set_status, status.request);
            try {
                const response = await CurrencyService.fetchCurrencies()
                commit(_set_status, status.success);
                commit(_set_currencies, response.data);
            }
            catch(error) {
                commit(_set_status, status.error);
                commit(_set_errors, error);
            }
        },
        async [GET_CURRENCY_API]({commit}, id) {
            commit(_set_status, status.request);
            commit(_set_currency, null);
            try {
                const response = await CurrencyService.fetchCurrency(id)
                commit(_set_status, status.success);
                commit(_set_currency, response.data);
            }
            catch(error) {
                commit(_set_status, status.error);
                commit(_set_errors, error);
            }
        },
        async [CREATE_CURRENCY_API]({commit}, {name, ticker}) {
            commit(_set_status, status.request);
            try {
                const response = await CurrencyService.createCurrency(name, ticker);
                commit(_set_status, status.success);
                commit(_set_errors, null);
                commit(_create_currency, response.data);
            }
            catch(error) {
                commit(_set_status, status.error);
                commit(_set_errors, error);
            }
        },
        async [UPDATE_CURRENCY_API]({commit}, currency) {
            commit(_set_status, status.request);
            try {
                const response = await CurrencyService.updateCurrency(currency);
                commit(_set_status, status.success);
                commit(_set_errors, null);
                commit(_update_currency, response.data);
            }
            catch(error) {
                commit(_set_status, status.error);
                commit(_set_errors, error);
            }
        },
        async [DELETE_CURRENCY_API]({commit}, id) {
            commit(_set_status, status.request);
            try {
                const response = await CurrencyService.deleteCurrency(id);
                commit(_set_status, status.success);
                commit(_delete_currency, response.data.id);
            }
            catch(error) {
                commit(_set_status, status.error);
                commit(_set_errors, error);
            }
        },
    },
    getters: {
        [GET_ALL_CURRENCIES]: (state) => state.currencies,
        [GET_CURRENCY]: (state) => state.currency,
        [GET_ERRORS]: (state) => state.errors,
        [GET_STATUS]: (state) => state.status
    }
}