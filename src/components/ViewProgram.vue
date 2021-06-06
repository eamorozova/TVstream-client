<template>
  <div class="viewProgram">
    <div class="bg-gray">
      <div class="container">
        <h1>Название телепередачи</h1>
        <v-chip outlined small>
          {{ 18 + '+' }}
        </v-chip>
        <div class="description">Описание телепередачи</div>
      </div>
    </div>
    <div class="timeline">
      <stream-list class="streamList" :streamList="streamList" />
    </div>
  </div>
</template>

<script>
import StreamList from './StreamList.vue';

export default {
  name: 'ViewProgram',
  components: {
    StreamList,
  },

  data() {
    return {
      streamList: [],
    };
  },

  created() {
    this.streamList = [
      {
        id: 1,
        program_id: 24,
        channel_id: 3,
        time: new Date(),
      },
      {
        id: 2,
        program_id: 24,
        channel_id: 3,
        time: new Date(),
      },
      {
        id: 3,
        program_id: 24,
        channel_id: 3,
        time: new Date(),
      },
    ];
  },
};
</script>

<style scoped>
.timeline {
  width: 600px;
  margin: auto;
}
.bg-gray {
  background-color: #efefef;
}

.description {
  margin-top: 10px;
}
.container {
  max-width: 600px;
  overflow: auto;
  padding: 30px;
}
</style>
