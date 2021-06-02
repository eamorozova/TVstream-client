<template>
  <div class="viewChannel">
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
    </v-card>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';

export default {
  name: 'ViewChannel',
  data() {
    return {
      channel: {},
      error: null,
    };
  },
  async mounted() {
    const channelId = this.$store.state.route.params.channelId;
    this.channel = (await ChannelsService.getChannel(channelId)).data;
  },
};
</script>

<style scoped></style>
