<template>
  <div>
    <v-list subheader max-width="500px" class="ma-auto">
      <v-subheader>Избранные каналы</v-subheader>
      <div v-for="(item, index) in favoritesData" :key="item.id">
        <favorite-item
          :favorite-item-data="item"
          @deleteFavorite="deleteFavorite(index)"
        ></favorite-item>
        <v-divider
          v-if="index < favoritesData.length - 1"
          :key="index"
          class="mx-5"
        ></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import FavoriteItem from './FavoriteItem';
import { mapActions } from 'vuex';

export default {
  name: 'Favorites',
  components: { FavoriteItem },
  props: {
    favoritesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions(['removeFavorite']),
    deleteFavorite(index) {
      this.removeFavorite(index);
    },
  },
};
</script>

<style></style>
