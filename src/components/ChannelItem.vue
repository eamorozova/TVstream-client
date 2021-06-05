<template>
  <div id="tv-channel">
    <v-card>
      <v-img height="200px" :src="channelData.image" />
      <v-card-title>{{ channelData.title }}</v-card-title>
      <v-card-text>{{ channelData.description }} </v-card-text>
      <v-card-actions>
        <v-btn
          rounded
          outlined
          color="blue-grey darkened-1"
          class="px-4 ml-2 mb-2"
          v-on:click="viewChannel(channelData.id)"
          >Расписание</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          outlined
          color="#7A6054"
          class="mr-2 mb-2"
          @click="likeChannel"
        >
          <v-icon>mdi-star-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data: () => ({
    show: false,
  }),
  props: {
    channelData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    likeChannel() {
      this.$emit('likeChannel', this.channelData);
    },
    viewChannel(id) {
      this.$router.push('/channels/' + String(id));
    },
  },
};
</script>

<style></style>
