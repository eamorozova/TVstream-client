<template>
  <div class="channel-list">
    <div v-if="$store.state.isAdmin">
      <v-btn
          rounded

          color="#7A6054"
          class="white--text mt-3 ml-2"
          @click="goTo('/create-channel')"
      >
        Добавить канал
      </v-btn>
      <v-btn
          rounded
          color="#7A6054"
          class="white--text mt-3 ml-2"
          @click="goTo('/create-program')"
      >Добавить передачу</v-btn
      >
      <v-divider class="mt-3 mx-2"></v-divider>
    </div>
    <v-container>
      <v-row>
        <v-col
          class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
          v-for="channel in channels"
          :key="channel.id"
        >
          <channel :channel-data="channel" @likeChannel="likeChannel" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Channel from './ChannelItem';
import ChannelsService from '../services/ChannelsService';
import FavoriteService from '../services/FavoriteService';

export default {
  data() {
    return {
      channels: null,
    };
  },
  name: 'Channels',
  components: { Channel },
  methods: {
    goTo(page) {
      this.$router.push(page);
    },
    likeChannel(data) {
      FavoriteService.post({ channelId: data.id });
    },
  },
  async mounted() {
    this.channels = (await ChannelsService.getChannels()).data;
  },
};
</script>

<style></style>
