<template>
  <div class="register">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Регистрация</v-card-title>
      <v-card-subtitle
        >в сервисе просмотра расписания ТВ-передач</v-card-subtitle
      >
      <v-card-text>
        <v-text-field
          type="name"
          name="name"
          v-model="name"
          label="имя"
          color="#7A6054"
          maxlength="32"
          counter
          :rules="[nameRules]"
        />
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
          maxlength="16"
          counter
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
          @click="register"
          elevation="2"
        >
          <v-icon left>mdi-account-plus-outline</v-icon>
          Зарегистрироваться
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

const namePattern = /^[а-яА-ЯёЁa-zA-Z]{2,32}$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = /^[a-zA-Z0-9]{6,16}$/;

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: null,
      alert: false,
      nameRules: name => {
        this.alert = false;
        return (
          name.length === 0 || namePattern.test(name) || 'Некорректное имя'
        );
      },
      emailRules: email => {
        this.alert = false;
        return (
          email.length === 0 ||
          emailPattern.test(email) ||
          'Некорректная форма записи электронной почты'
        );
      },
      passwordRules: password => {
        this.alert = false;
        return (
          password.length === 0 ||
          passwordPattern.test(password) ||
          'Не менее шести символов, допускаются только буквы латинского алфавита верхнего и нижнего регистра и цифры'
        );
      },
    };
  },
  computed: {
    formIsValid() {
      return (
        namePattern.test(this.name) &&
        emailPattern.test(this.email) &&
        passwordPattern.test(this.password)
      );
    },
  },
  methods: {
    async register() {
      this.alert = false;
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          name: this.name,
        });
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
        this.name = '';
        this.email = '';
        this.password = '';
        await this.$router.push('/login');
      } catch (error) {
        this.error = error.response.data.error;
        this.alert = true;
      }
    },
  },
  name: 'Register',
};
</script>

<style></style>
