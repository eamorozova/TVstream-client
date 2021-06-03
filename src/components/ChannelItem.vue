<template>
  <div id="tv-channel">
    <v-card>
      <v-img
        :src="channelData.image"
        height="200px"
        class="white--text align-end font-weight-black text-uppercase"
      >
      </v-img>
      <v-card-title>{{ channelData.title }}</v-card-title>
      <v-card-text>{{ channelData.description }} </v-card-text>
      <v-card-actions>
        <v-btn
          rounded
          outlined
          color="blue-grey darkned-1"
          class="ml-2 mb-2 px-4"
          >Расписание</v-btn
        >
        <!--v-btn
          rounded
          outlined
          color="blue-grey darkned-1"
          class="ml-2 mb-2 px-4"
          :to="{
            name: 'editChannel',
            params: {
              channelId: channelData.id,
            },
          }"
          >Изменить</v-btn
        -->
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
