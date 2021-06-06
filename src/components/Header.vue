<template>
  <div class="header">
    <v-app-bar color="blue-grey darken-1" dark>
      <v-app-bar-nav-icon v-on:click="goTo('/')">
        <v-icon color="white">mdi-television</v-icon>
      </v-app-bar-nav-icon>
      <span class="text-h6" @click="goTo('/')">Расписание ТВ передач</span>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          v-if="!$store.state.isLoggedIn"
          outlined
          @click="goTo('/register')"
        >
          <v-icon left>mdi-account-plus-outline</v-icon>
          Зарегистрироваться
        </v-btn>
        <v-btn
          class="ml-2"
          v-if="!$store.state.isLoggedIn"
          @click="goTo('/login')"
          icon
        >
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-btn
          v-if="$store.state.isLoggedIn"
          outlined
          @click="goTo('/favorites')"
          class="mr-2"
        >
          <v-icon left>mdi-star</v-icon>
          Избранное
        </v-btn>
        <v-btn v-if="$store.state.isLoggedIn" outlined @click="goTo('/user')">
          <v-icon left>mdi-account</v-icon>
          Профиль
        </v-btn>
        <v-btn v-if="$store.state.isLoggedIn" class="ml-2" @click="logout" icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-snackbar v-model="snackbar" timeout="3500" color="green">
      <v-icon left>mdi-check-circle-outline</v-icon>
      <span class="text-subtitle-1">Вы успешно вышли из аккаунта!</span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.snackbar = true;
      this.goTo('/');
    },
  },
};
</script>

<style scoped></style>
