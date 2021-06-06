<template>
  <div class="addProgram">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Создание телепередачи</v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          label="название"
          v-model="program.title"
          color="#7A6054"
          counter
          maxlength="16"
          :rules="[titleRules]"
        />
        <v-text-field
          type="text"
          label="категория"
          v-model="program.category"
          color="#7A6054"
          :rules="[titleRules]"
        />
        <v-text-field
          type="text"
          label="возрастное ограничение"
          v-model="program.ageLimit"
          color="#7A6054"
          :rules="[titleRules]"
        />
        <v-textarea
          label="описание"
          type="text"
          v-model="program.description"
          color="#7a6054"
          auto-grow
          counter
          rows="3"
          maxlength="256"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="font-weight-bold mb-2 mr-1 white--text px-2"
          color="blue-grey darken-1"
          @click="create"
          right
          elevation="2"
          :disabled="
            !(this.program.title !== null && this.program.title.length > 0)
          "
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProgramsService from '../services/ProgramsService';

let titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,15}$/;

export default {
  name: 'CreateProgram',
  data() {
    return {
      program: {
        title: null,
        description: null,
        category: null,
        ageLimit: null,
      },
      error: null,
      titleRules: title => {
        return (
          titlePattern.test(title) ||
          'Только буквы, цифры и пробелы, от двух до тридцати двух символов'
        );
      },
    };
  },
  methods: {
    async create() {
      try {
        await ProgramsService.post(this.program);
        await this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
