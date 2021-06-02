<template>
  <div class="channel-list">
    <router-link
      :to="{ name: 'favorites', params: { favoritesData: FAVORITES } }"
    >
      <v-btn rounded color="#7A6054" class="white--text mt-3 ml-2">
        <v-icon left>mdi-star</v-icon>
        Избранное
      </v-btn>
    </router-link>
    <v-divider class="mt-3 mx-2"></v-divider>
    <v-container>
      <v-row>
        <v-col
          v-for="channel in CHANNELS"
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChannelList',
  components: { Channel },
  computed: {
    ...mapGetters(['CHANNELS', 'FAVORITES']),
  },
  methods: {
    ...mapActions(['GET_CHANNELS', 'LIKE']),
    likeChannel(data) {
      this.LIKE(data);
    },
  },
  mounted() {
    this.GET_CHANNELS().then(response => {
      if (response.data) {
        console.log('Data arrived!');
      }
    });
  },
};
</script>

<style></style>
