<template>
  <div class="view-program">
    <v-container>
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <v-card rounded outlined elevation="2" class="mt-6">
            <div v-if="!editing">
              <v-sheet color="blue-grey lighten-1" height="150px" />
              <v-card-title class="text-h4">
                {{ program.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ program.description }}
                <br class="mb-1" />
                <v-chip
                  :color="restrictionColor(program.ageLimit)"
                  outlined
                  small
                >
                  {{ program.ageLimit + '+' }}
                </v-chip>
                <v-chip color="black" outlined small class="ml-2">
                  {{ program.category }}
                </v-chip>
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
            <div v-if="editing">
              <v-card-text>
                <v-text-field
                  type="text"
                  label="название"
                  v-model="title"
                  color="#7a6054"
                  counter
                  maxlength="32"
                  :rules="[titleRules]"
                />
                <v-text-field
                  type="text"
                  label="категория"
                  v-model="category"
                  color="#7a6054"
                  counter
                  maxlength="32"
                  :rules="[categoryRules]"
                />
                <v-text-field
                  type="text"
                  label="возратсное ограничение"
                  v-model="ageLimit"
                  color="#7a6054"
                  maxlength="2"
                  :rules="[ageLimitRules]"
                />
                <v-textarea
                  label="описание"
                  type="text"
                  v-model="description"
                  color="#7a6054"
                  auto-grow
                  counter
                  rows="3"
                  maxlength="256"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  color="#ff0000"
                  class="white--text ml-2 mb-2 pr-4"
                  @click="deleteProgram"
                >
                  <v-icon left>mdi-delete</v-icon>
                  удалить передачу
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
                  class="ml-2"
                  outlined
                  color="blue-grey darken-1"
                  @click="cancel"
                >
                  отмена
                </v-btn>
              </v-card-actions>
            </div>
            <div>
              <v-divider class="mx-2" />
              <v-card-text>
                <v-container v-for="stream in streams" :key="stream.id">
                  <v-row>
                    <v-col cols="2" align="right">
                      <span class="text-h6">{{
                        stream.time.substring(11, 16)
                      }}</span>
                      <br />
                      <span class="text-subtitle-1">{{
                        stream.time.substring(2, 10)
                      }}</span>
                    </v-col>
                    <v-col
                      :cols="infoCols"
                      class="font-weight-bold text-h6"
                      @click="$router.push('/channels/' + stream.ChannelId)"
                    >
                      {{ stream.Channel.title }}
                    </v-col>
                    <v-col :cols="btnCols" align="right">
                      <v-btn
                        icon
                        outlined
                        class="mt-3"
                        color="red"
                        v-if="$store.state.isAdmin"
                        @click="deleteStream(stream.id)"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container> </v-card-text
              >`
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StreamsService from '../services/StreamsService';
import ProgramsService from '../services/ProgramsService';

const titlePattern = /^[а-яА-ЯёЁa-zA-Z0-9][а-яА-ЯёЁa-zA-Z0-9 ]{1,31}$/;
const categoryPattern = /^[а-яА-яёЁa-zA-Z][а-яА-ЯёЁa-zA-Z ]{1,31}$/;
const ageLimitPattern = /^[0-9]{1,2}$/;

export default {
  async mounted() {
    if (this.$store.state.isAdmin) {
      this.infoCols = 9;
      this.btnCols = 1;
    }
    try {
      const programId = this.$store.state.route.params.programId;
      this.program = (await ProgramsService.getProgram(programId)).data;
      this.streams = (await StreamsService.getChannels(programId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    formIsValid() {
      return (
        titlePattern.test(this.title) &&
        categoryPattern.test(this.category) &&
        ageLimitPattern.test(this.ageLimit)
      );
    },
  },
  data() {
    return {
      ageLimit: '',
      ageLimitRules: ageLimit => {
        return (
          ageLimit.length === 0 ||
          ageLimitPattern.test(ageLimit) ||
          'Только цифры'
        );
      },
      btnCols: 0,
      category: '',
      categoryRules: category => {
        return (
          category.length === 0 ||
          categoryPattern.test(category) ||
          'Только буквы кириллицы и латинского алфавита от двух до тридцати двух символов'
        );
      },
      description: '',
      editing: false,
      infoCols: 10,
      program: {},
      streams: [],
      title: '',
      titleRules: title => {
        return (
          title.length === 0 ||
          titlePattern.test(title) ||
          'Только буквы, цифры и пробелы, от двух до тридцати двух символов'
        );
      },
    };
  },
  methods: {
    async deleteProgram() {
      await ProgramsService.delete(this.program.id);
      await this.$router.push('/');
    },
    async deleteStream(streamId) {
      await StreamsService.remove(streamId);
      this.streams = (await StreamsService.getChannels(this.program.id)).data;
    },
    async save() {
      this.program.title = this.title;
      this.program.category = this.category;
      this.program.ageLimit = this.ageLimit;
      this.program.description = this.description;
      await ProgramsService.put(this.program, this.program.id);
      this.cancel();
    },
    beginEditing() {
      this.editing = true;
      this.title = this.program.title;
      this.category = this.program.category;
      this.ageLimit = this.program.ageLimit;
      this.description = this.program.description;
    },
    cancel() {
      this.title = '';
      this.category = '';
      this.ageLimit = '';
      this.description = '';
      this.editing = false;
    },
    restrictionColor(age) {
      if (age >= 18) return 'red';
      if (age >= 16) return 'amber';
      if (age >= 12) return 'green';
      if (age >= 6) return 'blue';
      return 'black';
    },
  },
  name: 'ViewProgram',
};
</script>

<style scoped></style>
