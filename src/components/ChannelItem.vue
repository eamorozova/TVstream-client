<template>
  <div class="tv-channel">
    <!--    <img :src="require('../assets/images/' + channelData.image)" alt="img" />-->
    <br />
    <div class="label">
      <button class="btn" @click="likeChannel">❤</button>
      <span class="channel-name">{{ channelData.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channel',
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

<style>
img {
  height: 200px;
  width: 300px;
  border-radius: 30px;
  background-color: rgba(0, 151, 19, 0.99);
}

.channel-name {
  margin-left: 6px;
  font-weight: bold;
}

.label {
  display: inline;
  justify-content: center;
}

.tv-channel {
  overflow: hidden;
}

.btn {
  background: white;
  height: 30px;
  width: 30px;
  color: red;
  padding: 0;
  border-radius: 30%;
  border: 0;
  outline: none;
  cursor: pointer;
}

.btn:hover {
  background: red;
  color: white;
}
</style>
