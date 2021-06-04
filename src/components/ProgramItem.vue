<template>
  <div class="Program">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>{{ programData.title }}</v-card-title>
      <v-card-text>{{ programData.description }} </v-card-text>
      <v-card-text>Тематика: {{ programData.category }} </v-card-text>
      <v-card-text>{{ programData.ageLimit }} + </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProgramItem',
  data: () => ({
    show: false,
  }),
  props: {
    programData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
