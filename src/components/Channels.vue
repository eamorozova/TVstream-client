<template>
  <div class="channel-list">
    <router-link :to="{ name: 'favorites' }">
      <v-btn rounded color="#7A6054" class="white--text mt-3 ml-2">
        <v-icon left>mdi-star</v-icon>
        Избранное
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'createChannel' }">
      <v-btn rounded color="#7A6054" class="white--text mt-3 ml-2">
        Добавить канал
      </v-btn>
    </router-link>
    <v-divider class="mt-3 mx-2"></v-divider>
    <v-container>
      <v-row>
        <v-col
          v-for="channel in channels"
          :key="channel.id"
          class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
        >
          <channel :channel-data="channel" @likeChannel="likeChannel">
          </channel>
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
