<template>
  <div>
    <v-list-item>
      <v-list-item-content>{{
        favoriteData.Channel.title
      }}</v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="red" @click="deleteFavorite">
          <v-icon>mdi-star-off-outline</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
  },
  mounted() {
    console.log(this.favoriteData.Channel);
  },
};
</script>

<style></style>
