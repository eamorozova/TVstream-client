<template>
  <div class="addStream">
    <v-card class="mx-auto mt-16" max-width="450px" elevation="6">
      <v-card-title>Добавление трансляции</v-card-title>
      <v-card-text>
        <v-autocomplete
          color="#7a6054"
          item-color="brown lighten-1"
          label="Канал"
          outlined
          :items="channels"
        />

        <v-autocomplete
          color="#7a6054"
          item-color="brown lighten-1"
          label="Телепередача"
          outlined
          :items="programs"
        />
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Дата трансляции"
              prepend-icon="mdi-calendar"
              readonly
              color="#7a6054"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menu2 = true"
            :min="currentDate"
            color="#7a6054"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Время трансляции"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              color="#7a6054"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="time"
            format="24hr"
            color="#7a6054"
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="font-weight-bold mb-2 mr-1 white--text"
          color="blue-grey darken-1"
          elevation="2"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';
import StreamsService from '../services/StreamsService';
import ProgramsService from '../services/ProgramsService';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
export default {
  data: () => ({
    stream: {
      time: '',
      ChannelId: '',
      ProgramId: '',
    },
    channels: [],
    programs: [],
    currentDate: tomorrow.toISOString().substring(0, 10),
    date: new Date().toISOString().substr(0, 10),
  }),
  async mounted() {
    const channels = (await ChannelsService.get()).data;
    channels.forEach(channel => {
      this.channels.push(channel.title);
    });
    const programs = (await ProgramsService.get()).data;
    programs.forEach(program => {
      this.programs.push(program.title);
    });
  },
  methods: {
    async create() {
      try {
        await StreamsService.post(this.stream);
        await this.$router.push('/');
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>

<style></style>
