<template>
  <div class="editChannel">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Редактирование канала</v-card-title>
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
        @click="save"
        elevation="2"
        >сохранить</v-btn
      >
      <v-btn
        class="font-weight-bold mb-2 mr-1 white--text"
        color="blue-grey darken-1"
        right
        @click="deleteChannel"
        elevation="2"
        >удалить</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';

export default {
  name: 'EditChannel',
  data() {
    return {
      channel: {},
      error: null,
    };
  },
  methods: {
    async save() {
      const channelId = this.$store.state.route.params.channelId;
      try {
        await ChannelsService.put(this.channel, channelId);
        await this.$router.push({
          name: 'channels',
          params: {
            channelId: channelId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteChannel() {
      const channelId = this.$store.state.route.params.channelId;
      try {
        await ChannelsService.delete(channelId);
        await this.$router.push({
          name: 'channels',
          params: {
            channelId: channelId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      const channelId = this.$store.state.route.params.channelId;
      this.channel = (await ChannelsService.getChannel(channelId)).data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped></style>
