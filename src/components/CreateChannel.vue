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
          name="title"
          v-model="channel.title"
          label="название"
          color="#7A6054"
        />
        <v-text-field
          type="text"
          name="description"
          v-model="channel.description"
          label="описание"
          color="#7A6054"
        />
        <v-text-field
          type="text"
          name="image"
          v-model="channel.image"
          label="ссылка на логотип"
          color="#7A6054"
        />
      </v-card-text>
      <v-btn
        class="font-weight-bold mb-2 mr-1 white--text"
        color="blue-grey darken-1"
        right
        @click="addRandomImage"
        elevation="2"
        >рандомное изображение</v-btn
      >
      <v-btn
        class="font-weight-bold mb-2 mr-1 white--text"
        color="blue-grey darken-1"
        right
        @click="create"
        elevation="2"
        >добавить</v-btn
      >
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
      this.channel.image = 'https://picsum.photos/200/300';
    },
    async create() {
      try {
        await ChannelsService.post(this.channel);
        await this.$router.push({
          name: 'channel',
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
