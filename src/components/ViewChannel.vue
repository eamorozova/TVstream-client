<template>
  <div class="viewChannel">
    <v-container>
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <h1 class="empty-chanel" v-if="!channel">Такого канала нет</h1>
          <v-card v-if="channel" rounded outlined elevation="2" class="mt-6">
            <div v-if="!editing" text>
              <v-img :src="channel.image" height="250px" />
              <v-card-title class="text-h4">
                {{ channel.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ channel.description }}
              </v-card-subtitle>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  @click="beginEditing"
                  outlined
                  class="mb-1"
                  v-if="$store.state.isAdmin"
                >
                  <v-icon left>mdi-circle-edit-outline</v-icon>
                  Редактировать
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="editing" class="mx-4 mt-6 pb-2">
              <v-text-field
                type="text"
                label="название"
                v-model="channel.title"
                color="#7a6054"
                counter
                maxlength="16"
                :rules="[titleRules]"
              />
              <v-textarea
                label="описание"
                type="text"
                v-model="channel.description"
                color="#7a6054"
                auto-grow
                counter
                rows="3"
                maxlength="256"
              />
              <v-text-field
                type="text"
                v-model="channel.image"
                label="ссылка на логотип"
                color="#7A6054"
                append-outer-icon="mdi-image-plus"
                @click:append-outer="addRandomImage"
              />
              <v-card-actions>
                <v-btn
                  rounded
                  color="#ff0000"
                  class="white--text ml-n3 pr-4"
                  @click="deleteChannel"
                >
                  <v-icon left>mdi-delete</v-icon>
                  удалить канал
                </v-btn>
                <v-spacer />
                <v-btn
                  outlined
                  color="blue-grey darken-1"
                  @click="save"
                  :disabled="!formIsValid"
                >
                  сохранить
                </v-btn>
                <v-btn
                  class="mr-n3"
                  outlined
                  color="blue-grey darken-1"
                  @click="cancel"
                >
                  отмена
                </v-btn>
              </v-card-actions>
            </div>
            <v-divider class="mx-2" />

            <div class="streamController">
              <v-menu
                class="mx-2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="mx-12 mt-4"
                    v-model="date"
                    label="Выберите дату"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#7a6054"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                  color="#7a6054"
                  :min="new Date().toISOString().substring(0, 10)"
                ></v-date-picker>
              </v-menu>
              <v-btn outlined color="blue-grey darken-4" :disabled="!date" @click="selectDate">
                <v-icon left>mdi-magnify</v-icon>
                Показать
              </v-btn>
            </div>
            <div class="px-3">
              <v-container v-for="program in programs" :key="program.id">
                <program
                  :program-data="program"
                  @likeProgram="likeProgram"
                  @deleteStream="deleteStream"
                />
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="3500" color="green">
      <v-icon left>mdi-check-circle-outline</v-icon>
      <span class="text-subtitle-1"
        >Программа уже была добавлена в избранное</span
      >
    </v-snackbar>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';
import Program from './ProgramItem';
import StreamsService from '../services/StreamsService';
import FavoriteService from '../services/FavoriteService';

let titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,15}$/;

export default {
  name: 'ViewChannel',
  data() {
    return {
      programs: null,
      channel: {},
      date: '',
      error: null,
      editing: false,
      snackbar: false,
      storeTitle: '',
      storeDescription: '',
      storeImage: '',
      titleRules: title => {
        return (
          titlePattern.test(title) ||
          'Только буквы, цифры и пробелы, от двух до тридцати двух символов'
        );
      },
    };
  },
  components: {
    Program,
  },
  computed: {
    formIsValid() {
      return titlePattern.test(this.channel.title);
    },
  },
  async mounted() {
    try {
      const channelId = this.$store.state.route.params.channelId;
      this.channel = (await ChannelsService.getChannel(channelId)).data;
      this.programs = (await StreamsService.getPrograms(channelId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async deleteChannel() {
      const channelId = this.$store.state.route.params.channelId;
      try {
        await ChannelsService.delete(channelId);
        await this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteStream(id) {
      await StreamsService.remove(id);
      try {
        const channelId = this.$store.state.route.params.channelId;
        this.programs = (await StreamsService.getPrograms(channelId)).data;
      } catch (err) {
        console.log(err);
      }
    },
    async save() {
      const channelId = this.$store.state.route.params.channelId;
      if (this.channel.image === null || this.channel.image.length === 0) {
        this.addRandomImage();
      }
      try {
        await ChannelsService.put(this.channel, channelId);
        this.storeTitle = '';
        this.storeDescription = '';
        this.storeImage = '';
        this.editing = false;
      } catch (err) {
        console.log(err);
      }
    },
    async selectDate() {
      const channelId = this.$store.state.route.params.channelId;
      console.log(channelId);
      const time = this.date + 'T00:00:00.000Z';
      console.log(time);
      this.programs = (
        await StreamsService.getProgramsForDate(channelId, time)
      ).data;
    },
    addRandomImage() {
      let imageSeed = Math.floor(Math.random() * 9999);
      this.channel.image =
        'https://picsum.photos/seed/' + String(imageSeed) + '/450/200';
    },
    beginEditing() {
      this.storeTitle = this.channel.title;
      this.storeDescription = this.channel.description;
      this.storeImage = this.channel.image;
      this.editing = true;
    },
    cancel() {
      this.channel.title = this.storeTitle;
      this.channel.description = this.storeDescription;
      this.channel.image = this.storeImage;
      this.editing = false;
    },
    async likeProgram(data) {
      try {
        await FavoriteService.postProgram({ programId: data });
      } catch (err) {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.empty-chanel {
  width: 300px;
  margin: auto;
  padding-top: 90px;
}

.streamController {
  display: flex;
  align-items: center;
  padding-right: 40px;
}
</style>
