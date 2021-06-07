<template>
  <div>
    <div v-if="$store.state.isLoggedIn">
      <v-sheet class="mx-auto">
        <v-tabs
          background-color="blue-grey darken-1"
          fixed-tabs
          dark
          v-model="tabs"
        >
          <v-tab>
            Каналы
          </v-tab>
          <v-tab>
            Телепередачи
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item class="mt-4">
            <v-container>
              <v-row v-for="favorite in favorites"
                     :key="favorite.id"
              dense>
                <v-col cols="3"/>
                <v-col
                  cols="6"
                >
                  <favorite
                    :favorite-data="favorite"
                    @deleteFavorite="deleteFavorite"
                  >
                  </favorite>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>

          </v-tab-item>
        </v-tabs-items>
      </v-sheet>
    </div>
    <div v-if="!$store.state.isLoggedIn">
      <v-container class="mt-16">
        <v-row>
          <v-col cols="2" />
          <v-col cols="8">
            <v-card color="red" class="white--text">
              <v-card-title>
                <v-icon left color="white">mdi-alert</v-icon>
                Список избранных недоступен
              </v-card-title>
              <v-card-subtitle class="white--text">
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
      tabs: null,
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
    this.favorites = (await FavoriteService.getChannels()).data;
  },
  methods: {
    async deleteFavorite(index) {
      await FavoriteService.deleteChannel(index);
      this.favorites = (await FavoriteService.getChannels()).data;
    },
  },
};
</script>

<style></style>
