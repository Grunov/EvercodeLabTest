<template lang="pug">
    .currensies 
        .row
            .col-md-6.col-lg-4.m-auto
                h1.mb-5 Currensies list
                currency-list(:currencies="currencies")
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import CurrencyList from '@/components/CurrencyList';
import {
    GET_ALL_CURRENCIES_API,
    GET_ALL_CURRENCIES
} from '@/store/constants'

export default {
    computed: {
        ...mapGetters({
            currencies: `currency/${GET_ALL_CURRENCIES}`
        })
    },
    methods: {
        ...mapActions({
            getAllCurrenciesFromApi: `currency/${GET_ALL_CURRENCIES_API}`
        })
    },
    mounted() {
        this.getAllCurrenciesFromApi()
    },
    components: {
        CurrencyList
    }
}
</script>