<template lang="pug">
    dashboard-layout
        .dashboard-view
            router-view
</template>

<script>    
import DashboardLayout from "@/layout/DashboardLayout";

export default {
    name: "Dashboard",
    components: {
        DashboardLayout,
    }
}
</script>