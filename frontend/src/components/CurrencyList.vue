<template lang="pug">
    ul.list-group(v-if="currencies.length > 0")
        currency-item(v-for="currency in currencies" :key="currency.id" :currency="currency") 
    p(v-else) Currencies list is empty
</template>

<script>
import CurrencyItem from '@/components/CurrencyItem'
export default {
    name: 'currency-list',
    props: {
        currencies: {
            type: Array,
            required: true
        }
    },
    components: {
        CurrencyItem
    }
}
</script>