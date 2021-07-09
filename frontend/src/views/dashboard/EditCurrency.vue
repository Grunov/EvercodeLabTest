<template lang="pug">
    .edit-currency.row
        .col-md-6.col-lg-4.m-auto
            h1.mb-5 Edit currency
            edit-form(v-if="currency" :currency="currency")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditForm from '@/components/EditForm';
import { GET_CURRENCY_API, GET_CURRENCY } from '@/store/constants';

export default {
    name: 'edit-currency',
    mounted() {
        const currencyId = this.$route.params.id;
        this.getCurrency(currencyId);
    },
    computed: {
        ...mapGetters({
            currency: `currency/${GET_CURRENCY}`,
        }),
    },
    methods: {
        ...mapActions({
            getCurrency: `currency/${GET_CURRENCY_API}`,
        }),
    },
    components: {
        EditForm
    }
}
</script>