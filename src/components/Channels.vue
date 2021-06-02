<template>
  <div class="channel-list">
    <channel
      v-for="channel in CHANNELS"
      :key="channel.id"
      :channel-data="channel"
      @likeChannel="likeChannel"
    ></channel>
    <router-link
      :to="{ name: 'favorites', params: { favoritesData: FAVORITES } }"
    >
      <div>Favorites: {{ FAVORITES.length }}</div>
    </router-link>
  </div>
</template>

<script>import Channel from './ChannelItem';
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

<style>
.channel-list {
  display: grid;
  grid-gap: 30px;
}

@media screen and (min-width: 1340px) {
  .channel-list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media screen and (max-width: 1340px) and (min-width: 1100px) {
  .channel-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media screen and (max-width: 1100px) and (min-width: 680px) {
  .channel-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 680px) {
  .channel-list {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
