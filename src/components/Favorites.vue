<template>
  <div>
    <p v-if="!favoritesData.length">No favorites...</p>
    <router-link :to="{ name: 'channels' }">
      <div>HOME</div>
    </router-link>
    <favorite-item
      v-for="(item, index) in favoritesData"
      :key="item.id"
      :favorite-item-data="item"
      @deleteFavorite="deleteFavorite(index)"
    />
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
    ...mapActions(['DELETE_FAVORITE']),
    deleteFavorite(index) {
      this.DELETE_FAVORITE(index);
    },
  },
};
</script>

<style></style>
