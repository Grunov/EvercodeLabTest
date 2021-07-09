<template lang="pug">
    nav.navbar.navbar-expand-lg.navbar-light.bg-light.fixed-top
        .container-fluid
            router-link.navbar-brand(to="/")|Dashboard
            button.navbar-toggler(type="button")
                span.navbar-toggler-icon
            div.collapse.navbar-collapse
                ul.navbar-nav.mb-2.mb-lg-0
                    li.nav-item
                        router-link.nav-link(:to="{name: 'currency'}")
                          | Currencies
                    li.nav-item
                        router-link.nav-link(:to="{name: 'create-currency'}")
                          | Create
                ul.navbar-nav.ms-auto.mb-2.mb-lg-0
                    li.nav-item
                        button.btn.btn-danger(@click="logout")
                          | Signout
</template>

<script>
import { mapActions } from 'vuex';
import { SIGNOUT } from '@/store/constants';
export default {
  methods: {
    ...mapActions({
      signout: `auth/${SIGNOUT}`,
    }),
    async logout() {
      await this.signout().then(() => {
        this.$router.push({ name: 'signin' });
      });
    },
  },
};
</script>