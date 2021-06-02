<template>
  <div>
    <v-list-item>
      <v-list-item-content>{{ favoriteItemData.title }}</v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="red" @click="deleteFavorite">
          <v-icon>mdi-star-off-outline</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
