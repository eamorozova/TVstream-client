<template>
  <div class="Program">
    <v-row>
      <v-col cols="2" align="right">
        <span class="text-h6">{{ programData.time.substring(11, 16) }}</span>
        <br />
        <span class="text-subtitle-1">{{
          programData.time.substring(0, 10)
        }}</span>
      </v-col>
      <v-col
        cols="9"
        class="font-weight-bold text-h6"
        @click="$router.push('/viewprogram')"
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
      <v-col cols="1" class="align-content-stretch">
        <v-btn
          icon
          outlined
          class="mt-3"
          color="#7a6054"
          v-if="$store.state.isLoggedIn"
          @click="likeProgram"
        >
          <v-icon>mdi-star-outline</v-icon>
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
  }),
  methods: {
    likeProgram() {
      this.$emit('likeProgram', this.programData);
    },
    restrictionColor(age) {
      if (age >= 18) return 'red';
      if (age >= 16) return 'amber';
      if (age >= 12) return 'green';
      if (age >= 6) return 'blue';
      return 'black';
    },
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
