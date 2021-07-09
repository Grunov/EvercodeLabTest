<template lang="pug">
    .dashboard-layout
        navbar
        .container.pt-5.mt-5
            slot
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
export default {
    components: {
        Navbar
    }
}
</script>