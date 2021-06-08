<template>
  <div class="Program">
    <v-row>
      <v-col cols="2" align="right">
        <span class="text-h6">{{ programData.time.substring(11, 16) }}</span>
        <br />
        <span class="text-subtitle-1">{{
          programData.time.substring(2, 10)
        }}</span>
      </v-col>
      <v-col
        :cols="infoCols"
        class="font-weight-bold text-h6"
        @click="$router.push('/programs/' + programData.Program.id)"
      >
        {{ programData.Program.title }}
        <br />
        <div>
          <v-chip
            :color="restrictionColor(programData.Program.ageLimit)"
            outlined
            small
          >
            {{ programData.Program.ageLimit + '+' }}
          </v-chip>
          <v-chip outlined small class="ml-2" color="black">
            {{ programData.Program.category }}
          </v-chip>
        </div>
      </v-col>
      <v-col :cols="btnCols" align="right">
        <v-btn
          icon
          outlined
          class="mt-3 mr-2"
          color="#7a6054"
          v-if="$store.state.isLoggedIn"
          @click="likeProgram"
        >
          <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          outlined
          class="mt-3"
          color="red"
          v-if="$store.state.isAdmin"
          @click="deleteStream"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProgramItem',
  data: () => ({
    show: false,
    infoCols: 9,
    btnCols: 1,
  }),
  methods: {
    deleteStream() {
      this.$emit('deleteStream', this.programData.id);
    },
    likeProgram() {
      this.$emit('likeProgram', this.programData.ProgramId);
    },
    restrictionColor(age) {
      if (age >= 18) return 'red';
      if (age >= 16) return 'amber';
      if (age >= 12) return 'green';
      if (age >= 6) return 'blue';
      return 'black';
    },
  },
  mounted() {
    if (this.$store.state.isAdmin) {
      this.infoCols = 7;
      this.btnCols = 3;
    } else if (!this.$store.state.isLoggedIn) {
      this.infoCols = 10;
    }
  },
  props: {
    programData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
