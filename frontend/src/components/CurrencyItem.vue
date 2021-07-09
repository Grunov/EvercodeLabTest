<template lang="pug">
    ul.list-group-item.d-flex.align-items-center.justify-content-between
        router-link(:to="`edit/${currency._id}`") {{ currency.name }}
        div
            span.badge.bg-primary.me-3 {{ currency.ticker }} 
            button.btn.btn-danger(@click="deleteCurrency(currency._id)") Delete
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'currency-item',
    props: {
        currency: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions({
            deleteCurrency: 'currency/DELETE_CURRENCY_API'
        }) 
    }
}
</script>