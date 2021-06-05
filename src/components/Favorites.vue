<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="favorite in favorites"
          :key="favorite.id"
          class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
        >
          <favorite :favorite-data="favorite"> </favorite>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Favorite from './FavoriteItem';
import FavoriteService from '../services/FavoriteService';

export default {
  name: 'Favorites',
  components: { Favorite },
  data() {
    return {
      favorites: null,
    };
  },
  props: {
    favoritesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  async mounted() {
    this.favorites = (await FavoriteService.get()).data;
  },
  methods: {
    async deleteFavorite(index) {
      FavoriteService.delete(index);
      this.favorites = (await FavoriteService.get()).data;
    },
  },
};
</script>

<style></style>
