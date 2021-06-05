<template>
  <div id="register-form">
    <v-card
      class="mx-auto mt-16"
      elevation="6"
      id="register-form-card"
      max-width="450px"
    >
      <v-card-title>Регистрация</v-card-title>
      <v-card-subtitle>
        в сервисе просмотра расписания ТВ-передач
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          color="#7A6054"
          counter
          id="register-form-name-field"
          label="имя"
          maxlength="32"
          name="name"
          type="name"
          v-model="name"
          :rules="[nameRules]"
        />
        <v-text-field
          color="#7A6054"
          if="register-form-email-field"
          label="электронная почта"
          name="email"
          type="email"
          v-model="email"
          :rules="[emailRules]"
        />
        <v-text-field
          color="#7A6054"
          counter
          id="register-form-password-field"
          label="пароль"
          maxlength="16"
          name="password"
          type="password"
          v-model="password"
          :rules="[passwordRules]"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="font-weight-bold white--text mr-1 mb-2"
          color="blue-grey darken-1"
          elevation="2"
          right
          :disabled="!formIsValid"
          @click="register"
        >
          <v-icon left>mdi-account-plus-outline</v-icon>
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-alert
      class="mx-auto mt-8"
      dismissible
      elevation="6"
      id="register-form-error-alert"
      max-width="450px"
      rounded
      type="error"
      v-model="alert"
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
      name: '',
      email: '',
      password: '',
      alert: false,
      error: null,
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
        await AuthenticationService.register({
          email: this.email,
          password: this.password,
          name: this.name,
        });
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
        this.name = '';
        this.email = '';
        this.password = '';
        await this.$router.push('/');
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
