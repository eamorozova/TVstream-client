<template>
  <div class="addChannel">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Создание канала</v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          label="название"
          v-model="channel.title"
          color="#7A6054"
          counter
          maxlength="16"
          :rules="[titleRules]"
        />
        <v-textarea
          label="описание"
          type="text"
          v-model="channel.description"
          color="#7a6054"
          auto-grow
          counter
          rows="3"
          maxlength="256"
        ></v-textarea>
        <v-text-field
          type="text"
          v-model="channel.image"
          label="ссылка на логотип"
          color="#7A6054"
          append-outer-icon="mdi-image-plus"
          @click:append-outer="addRandomImage"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
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
import ChannelsService from '../services/ChannelsService';

let titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,15}$/;

export default {
  name: 'CreateChannel',
  data() {
    return {
      channel: {
        title: '',
        description: '',
        image: '',
      },
      error: null,
      snackbar: false,
      titleRules: title => {
        return (
          title.length === 0 ||
          titlePattern.test(title) ||
          'Только буквы, цифры и пробелы, от двух до шестнадцати символов'
        );
      },
    };
  },
  computed: {
    formIsValid() {
      return titlePattern.test(this.channel.title);
    },
  },
  methods: {
    addRandomImage() {
      let imageSeed = Math.floor(Math.random() * 9999);
      this.channel.image =
        'https://picsum.photos/seed/' + String(imageSeed) + '/450/200';
    },
    async create() {
      if (this.channel.image === null || this.channel.image.length === 0) {
        this.addRandomImage();
      }
      try {
        await ChannelsService.post(this.channel);
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
