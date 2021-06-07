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
            <div v-if="channelsEmpty">
              <v-container class="mt-16">
                <v-row>
                  <v-col cols="2" />
                  <v-col cols="8">
                    <v-card color="amber darken-2" class="white--text">
                      <v-card-title>
                        <v-icon left color="white">mdi-alert</v-icon>
                        Список избранных каналов пуст
                      </v-card-title>
                      <v-card-subtitle class="white--text">
                        Нажмите на кнопку со здвёздочкой на карточке канала,
                        чтобы добавить его в избранное
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <v-container>
              <v-row v-for="channel in channels" :key="channel.id" dense>
                <v-col cols="3" />
                <v-col cols="6">
                  <favorite
                    :favorite-data="channel"
                    @deleteFavorite="deleteFavorite"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item class="mt-4">
            <div v-if="programsEmpty">
              <v-container class="mt-16">
                <v-row>
                  <v-col cols="2" />
                  <v-col cols="8">
                    <v-card color="amber darken-2" class="white--text">
                      <v-card-title>
                        <v-icon left color="white">mdi-alert</v-icon>
                        Список избранных телепередач пуст
                      </v-card-title>
                      <v-card-subtitle class="white--text">
                        Нажмите на кнопку со здвёздочкой на карточке
                        телепередачи, чтобы добавить её в избранное
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <v-container>
              <v-row v-for="program in programs" :key="program.id" dense>
                <v-col cols="3" />
                <v-col cols="6">
                  <v-card>
                    <v-card-title>
                      {{ program.Program.title }}
                    </v-card-title>
                    <v-card-subtitle>
                      <v-chip
                        :color="restrictionColor(program.Program.ageLimit)"
                        outlined
                        small
                      >
                        {{ program.Program.ageLimit + '+' }}
                      </v-chip>
                      <v-chip outlined small class="ml-2" color="black">
                        {{ program.Program.category }}
                      </v-chip>
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        color="blue-grey darken-1"
                        rounded
                        small
                        class="ml-2 mb-2"
                        @click="$router.push('/programs/' + program.ProgramId)"
                        outlined
                      >
                        Страница программмы
                      </v-btn>
                      <v-spacer />
                      <v-btn
                        color="red"
                        icon
                        small
                        class="mb-2 mr-2"
                        outlined
                        @click="deleteFavoriteProgram(program.id)"
                      >
                        <v-icon small>mdi-star-off-outline</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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
  computed: {
    channelsEmpty() {
      if (this.channels !== null) {
        return this.channels.length === 0;
      }
      return false;
    },
    programsEmpty() {
      if (this.programs !== null) {
        return this.programs.length === 0;
      }
      return false;
    },
  },
  data() {
    return {
      channels: null,
      programs: null,
      tabs: null,
    };
  },
  async mounted() {
    this.channels = (await FavoriteService.getChannels()).data;
    this.programs = (await FavoriteService.getPrograms()).data;
  },
  methods: {
    async deleteFavorite(index) {
      await FavoriteService.deleteChannel(index);
      this.channels = (await FavoriteService.getChannels()).data;
    },
    async deleteFavoriteProgram(id) {
      await FavoriteService.deleteProgram(id);
      this.programs = (await FavoriteService.getPrograms()).data;
    },
    restrictionColor(age) {
      if (age >= 18) return 'red';
      if (age >= 16) return 'amber';
      if (age >= 12) return 'green';
      if (age >= 6) return 'blue';
      return 'black';
    },
  },
};
</script>

<style></style>
