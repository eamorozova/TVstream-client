<template>
  <div class="Program">
    <v-row>
      <v-col cols="2" align="right">
        <span class="text-h6">09.41 AM</span>
        <br />
        23 января
      </v-col>
      <v-col cols="10" class="font-weight-bold text-h6">
        {{ programData.title }}
        <br />
        <div>
          <v-chip :color="restrictionColor(programData.ageLimit)" outlined small>
            {{ programData.ageLimit + '+' }}
          </v-chip>
          <v-chip outlined small class="ml-2" color="black">
            {{ programData.category }}
          </v-chip>
        </div>
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
