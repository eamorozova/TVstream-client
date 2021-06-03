<template>
  <div class="login">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Вход</v-card-title>
      <v-card-subtitle
        >в сервис просмотра расписания ТВ-передач</v-card-subtitle
      >
      <v-card-text>
        <v-text-field
          type="email"
          name="email"
          v-model="email"
          label="электронная почта"
          color="#7A6054"
          :rules="[emailRules]"
        />
        <v-text-field
          type="password"
          name="password"
          v-model="password"
          label="пароль"
          color="#7A6054"
          counter
          maxlength="16"
          :rules="[passwordRules]"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="font-weight-bold mb-2 mr-1 white--text"
          color="blue-grey darken-1"
          :disabled="!formIsValid"
          right
          @click="login"
          elevation="2"
        >
          <v-icon left>mdi-login-variant</v-icon>
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-alert
      v-model="alert"
      type="error"
      elevation="6"
      dismissible
      rounded
      class="mx-auto mt-8"
      max-width="450px"
    >
      <div v-html="error" />
    </v-alert>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      alert: false,
      emailRules: email => {
        this.alert = false;
        return (
          email.length === 0 ||
          emailPattern.test(email) ||
          'Некорректная форма записи электронной почты'
        );
      },
      // eslint-disable-next-line no-unused-vars
      passwordRules: password => {
        this.alert = false;
        return true;
      },
    };
  },
  computed: {
    formIsValid() {
      return emailPattern.test(this.email) && this.password.length >= 6;
    },
  },
  methods: {
    async login() {
      this.alert = false;
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
        await this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.error;
        this.alert = true;
      }
    },
  },
  name: 'Login',
};
</script>

<style></style>
