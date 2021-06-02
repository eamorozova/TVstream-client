<template>
  <div class="header">
    <nav>
      <v-app-bar color="blue-grey darken-1" dark>
        <v-app-bar-nav-icon @click="goHome()">
          <v-icon color="white">mdi-television</v-icon>
        </v-app-bar-nav-icon>
        <v-app-bar-title>Расписание ТВ передач</v-app-bar-title>
        <v-spacer></v-spacer>
        <div>
          <router-link :to="{ name: 'login' }">
            <v-btn outlined>
              Войти
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'register' }">
            <v-btn outlined class="ml-2">
              Зарегистрироваться
            </v-btn>
          </router-link>
        </div>
      </v-app-bar>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
