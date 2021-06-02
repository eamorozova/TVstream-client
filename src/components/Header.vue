<template>
  <div class="header">
    <v-app-bar color="blue-grey darken-1" dark>
      <v-app-bar-nav-icon v-on:click="goTo('/')">
        <v-icon color="white">mdi-television</v-icon>
      </v-app-bar-nav-icon>
      <span class="text-h6" @click="goTo('/')">Расписание ТВ передач</span>
      <v-spacer></v-spacer>
      <div>
        <v-btn outlined @click="goTo('/login')">
          Войти
        </v-btn>
        <v-btn outlined class="ml-2" @click="goTo('/register')">
          Зарегистрироваться
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goTo(page) {
      this.$router.push(page);
    },
  },
};
</script>

<style scoped></style>
