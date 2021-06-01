<template>
  <div class="register">
    <v-card class="mx-auto mt-16" max-width="450px" color="grey lighten-5" elevation="6">
      <v-card-title>Регистрация</v-card-title>
      <v-card-subtitle>в сервисе просмотра расписания ТВ-передач</v-card-subtitle>
      <v-card-text>
        <v-text-field type="email"
                      name="email"
                      v-model="email"
                      class="pa-0 ma-0"
                      color="#7A6054"
                      label="электронная почта"
                      :rules="[emailRules]"
        />
        <v-text-field color="#7A6054"
            type="password"
            name="password"
            maxlength="16"
            v-model="password"
            label="пароль"
            :rules="[passwordRules]"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="font-weight-bold mb-2 mr-1 white--text"
               color="blue-grey darken-1"
               :disabled="!formIsValid"
               right @click='register'
               elevation="2">
          <v-icon left>mdi-account-plus-outline</v-icon>
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-model="alert"
             type="error"
             dismissible
             rounded
             class="mx-auto mt-8"
             max-width="300px">
      <div v-html="error"/>
    </v-alert>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      alert: false,
      disabled: true,
      emailRules: value => {
        return value.length === 0 || pattern.test(value) || 'Invalid e-mail';
      },
      passwordRules: value => {
        return value.length === 0 || (value.length >= 6 && value.length <= 16) || 'Incorrect password';
      },
    };
  },
  computed: {
    formIsValid() {
      return (
        pattern.test(this.email)
      )
    },
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
        this.alert = true;
      }
    },
  },
  name: 'Register',
};
</script>

<style>
</style>
