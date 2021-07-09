<template lang="pug">
    .create-currency.row
        .col-md-6.col-lg-4.m-auto
            h1.mb-5 Create currency
            create-form
</template>

<script>
import CreateForm from '@/components/CreateForm'

export default {
    name: 'create-currency',
    components: {
        CreateForm
    }
}
</script>