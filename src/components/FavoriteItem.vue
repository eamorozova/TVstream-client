<template>
  <div>
    <v-card>
      <v-container class="pa-0">
        <v-row class="pa-0 ma-0">
          <v-col class="pa-0" cols="2">
            <v-avatar size="60" class="ma-3" rounded>
              <v-img :src="favoriteData.Channel.image" />
            </v-avatar>
          </v-col>
          <v-col class="pa-0 mt-n2">
            <v-card-title>{{ favoriteData.Channel.title }}</v-card-title>
            <v-card-actions>
              <v-btn
                outlined
                color="blue-grey darkened-1"
                class="px-4 ml-2 mb-2"
                v-on:click="viewChannel(favoriteData.Channel.id)"
                >Расписание</v-btn
              >
              <v-spacer />
              <v-btn
                color="red"
                icon
                @click="deleteFavorite"
                outlined
                class="mr-2 mb-2"
              >
                <v-icon> mdi-star-off-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
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
      this.$emit('deleteFavorite', this.favoriteData.id);
    },
    viewChannel(id) {
      this.$router.push('/channels/' + String(id));
    },
  },
  mounted() {
    console.log(this.favoriteData.Channel);
  },
};
</script>

<style scoped />
