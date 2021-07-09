<template lang="pug">
  form.signin-form.form(@submit.prevent="login")
    .mb-3
      label.form-label(for="email")|Email
      input.form-control#email(type="email" v-model="email")
    .mb-3
      label.form-label(for="password")|Password
      input.form-control#password(type="password" v-model="password")
    button.btn.btn-success.w-100(type="submit")|Signin
</template>

<script>
import {mapActions} from 'vuex';
import {
  SIGNIN
} from '@/store/constants'

export default {
  name: 'SigningForm',
  data: () => ({
    email: 'test@test.com',
    password: 'testtest',
  }),
  methods: {
    ...mapActions({
      signin: `auth/${SIGNIN}`
    }),
    login() {
      this.signin({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'dashboard'})
      })
    }
  }
};
</script>
