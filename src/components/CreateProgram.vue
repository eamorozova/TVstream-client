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
          color="#7a6054"
          counter
          maxlength="32"
          :rules="[titleRules]"
        />
        <v-text-field
          type="text"
          label="категория"
          v-model="program.category"
          color="#7a6054"
          counter
          maxlength="32"
          :rules="[categoryRules]"
        />
        <v-text-field
          type="text"
          label="возрастное ограничение"
          v-model="program.ageLimit"
          color="#7a6054"
          maxlength="2"
          :rules="[ageLimitRules]"
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
        <v-spacer />
        <v-btn
          class="font-weight-bold mb-2 mr-1 white--text px-2"
          color="blue-grey darken-1"
          @click="create"
          right
          elevation="2"
          :disabled="!formIsValid"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" timeout="3500" color="red">
      <v-icon left>mdi-alert</v-icon>
      <span class="text-subtitle-1">{{ error }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import ProgramsService from '../services/ProgramsService';

const titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,31}$/;
const categoryPattern = /^[а-яА-яёЁa-zA-Z][а-яА-ЯёЁa-zA-Z ]{1,31}$/;
const ageLimitPattern = /^[0-9]{1,2}$/;

export default {
  name: 'CreateProgram',
  computed: {
    formIsValid() {
      return (
        titlePattern.test(this.program.title) &&
        categoryPattern.test(this.program.category) &&
        ageLimitPattern.test(this.program.ageLimit)
      );
    },
  },
  data() {
    return {
      program: {
        title: '',
        category: '',
        ageLimit: '',
        description: '',
      },
      error: null,
      snackbar: false,
      ageLimitRules: ageLimit => {
        return (
          ageLimit.length === 0 ||
          ageLimitPattern.test(ageLimit) ||
          'Только цифры'
        );
      },
      categoryRules: category => {
        return (
          category.length === 0 ||
          categoryPattern.test(category) ||
          'Только буквы кириллицы и латинского алфавита от двух до тридцати двух символов'
        );
      },
      titleRules: title => {
        return (
          title.length === 0 ||
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
        this.error = err.response.data.error;
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped></style>
