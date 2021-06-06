<template>
  <div>
    
    <div v-if="$store.state.isLoggedIn">
      <v-container>
        <h1 class="mb-8 mt-4">Избранные каналы</h1>
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
    <div v-if="!$store.state.isLoggedIn">
      <v-container class="mt-16">
        <v-row>
          <v-col cols="2" />
          <v-col cols="8">
            <v-card color="red" class="white--text">
              <v-card-title>
                <v-icon left color="white">mdi-alert</v-icon>
                Список избранных телеканалов недоступен
              </v-card-title>
              <v-card-subtitle class="white--text ">
                Зарегистрируйтесь или войдите в свой аккаунт для получения
                возможности добавления телеканалов и передач в список Избранных
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </div>
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
