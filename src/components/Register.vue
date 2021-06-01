<template>
  <div>
    <h1>Register</h1>
    <div>
      <input type='email' name='email' placeholder='email' />
      <input type='password' name='password' placeholder='password' />
      <div v-html='error' />
      <button @click='register'>Register</button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
        });
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  name: 'Register',
};
</script>

<style></style>
