<template>
  <div id="tv-channel">
    <v-card>
      <v-img
        src="https://picsum.photos/400/200"
        height="200px"
        class="white--text align-end font-weight-black text-uppercase"
      >
        <v-card-title>{{ channelData.title }}</v-card-title>
      </v-img>
      <v-card-text
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consequat nisi diam, id porta nisl iaculis non. In faucibus consequat
        urna. Suspendisse potenti. Aenean vulputate ac nisl at malesuada.
        Quisque mollis consequat vestibulum. Nulla malesuada commodo sapien, at
        posuere mauris finibus eu. In hac habitasse platea dictumst. Mauris ac
        nisl fermentum, fermentum leo sed, mollis tellus.
      </v-card-text>
      <v-card-actions>
        <v-btn
          rounded
          outlined
          color="blue-grey darkned-1"
          class="ml-2 mb-2 px-4"
          >Расписание</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          outlined
          color="#7A6054"
          @click="likeChannel"
          class="mr-2 mb-2"
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
  },
};
</script>

<style></style>
