<template>
  <div>
    <img :src="favoriteItemData.image" alt="img" />
    <div>
      <p>{{ favoriteItemData.title }}</p>
    </div>
    <button @click="deleteFavorite">DISLIKE</button>
  </div>
</template>

<script>
export default {
  name: 'FavoriteItem',
  props: {
    favoriteItemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteFavorite() {
      this.$emit('deleteFavorite');
    },
  },
  mounted() {
    this.$set(this.favoriteItemData, 'isFavorite', true);
  },
};
</script>

<style></style>
