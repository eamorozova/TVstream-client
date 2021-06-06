<template>
  <div>
    <v-card>
      <v-img height="200px" :src="favoriteData.Channel.image" />
      <v-card-title>{{ favoriteData.Channel.title }}</v-card-title>
      <v-card-text>{{ favoriteData.Channel.description }} </v-card-text>
      <v-card-actions>
        <v-btn
          rounded
          outlined
          color="blue-grey darkened-1"
          class="px-4 ml-2 mb-2"
          v-on:click="viewChannel(favoritelData.channel.id)"
          >Расписание</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="deleteFavorite">
          <v-icon>mdi-star-off-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import FavoriteService from '../services/FavoriteService';

export default {
  name: 'FavoriteItem',
  props: {
    favoriteData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteFavorite() {
     
      FavoriteService.delete(this.favoriteData.id);
    },
    viewChannel(id) {

      console.log(String(id))
      this.$router.push('/channels/' + String(id));
    },

  },
  mounted() {
    console.log(this.favoriteData.Channel);

  },
};
</script>

<style></style>
