<template>
  <div class="viewChannel">
    <v-container>
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <v-card rounded outlined elevation="2">
            <div v-if="!editing">
              <v-img :src="channel.image" height="250px" />
              <v-card-title class="text-h4">
                {{ channel.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ channel.description }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="beginEditing" outlined class="mb-1">
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
            <div class="px-3">
              <v-divider />
              <v-container v-for="program in programs" :key="program.id">
                <program :program-data="program"> </program>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChannelsService from '../services/ChannelsService';
import Program from './ProgramItem';
import StreamsService from '../services/StreamsService';

let titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,15}$/;

export default {
  name: 'ViewChannel',
  data() {
    return {
      programs: null,
      channel: {},
      error: null,
      editing: false,
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
      console.log(this.programs);
      console.log(this.programs);
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
  },
};
</script>

<style scoped></style>
