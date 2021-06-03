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
          :disabled="
            !(this.channel.title !== null && this.channel.title.length > 0)
          "
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';

export default {
  name: 'CreateChannel',
  data() {
    return {
      channel: {
        title: null,
        description: null,
        image: null,
      },
      error: null,
    };
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
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
