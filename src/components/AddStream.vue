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
          v-model="channelTitle"
          :items="channelTitles"
        />
        <v-autocomplete
          color="#7a6054"
          item-color="brown lighten-1"
          label="Телепередача"
          outlined
          v-model="programTitle"
          :items="programTitles"
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
            />
          </template>
          <v-date-picker
            v-model="date"
            @input="menu2 = true"
            :min="minDate"
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
          @click="create"
          :disabled="!formIsValid"
        >
          <v-icon left>mdi-plus-circle</v-icon> Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';
import StreamsService from '../services/StreamsService';
import ProgramsService from '../services/ProgramsService';

const now = new Date().toISOString().substring(0, 10);

export default {
  computed: {
    formIsValid() {
      return (
        this.channelTitle !== '' &&
        this.programTitle !== '' &&
        this.date !== '' &&
        this.time !== ''
      );
    },
  },
  data: () => ({
    channels: {},
    channelTitle: '',
    channelTitles: [],
    minDate: now,
    date: now,
    error: null,
    time: '',
    programs: {},
    programTitle: '',
    programTitles: [],
    stream: {
      time: '',
      channelId: '',
      programId: '',
    },
  }),
  async mounted() {
    this.channels = (await ChannelsService.get()).data;
    this.channels.forEach(channel => {
      this.channelTitles.push(channel.title);
    });
    this.programs = (await ProgramsService.get()).data;
    this.programs.forEach(program => {
      this.programTitles.push(program.title);
    });
  },
  methods: {
    async create() {
      for (const channel of this.channels) {
        if (channel.title === this.channelTitle) {
          this.stream.channelId = channel.id;
          break;
        }
      }
      for (const program of this.programs) {
        if (program.title === this.programTitle) {
          this.stream.programId = program.id;
          break;
        }
      }
      this.stream.time = this.date + 'T' + this.time + ':00.000Z';
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

<style />
