<template>
  <div class="addStream">
    <v-card
      class="mx-auto mt-16"
      max-width="450px"
      color="grey lighten-5"
      elevation="6"
    >
      <v-card-title>Добавление трвнсляции</v-card-title>
      <v-card-text>

       <v-select
            :chenels="chenels"
            label="Канал трансляции"
            outlined
        ></v-select>

        <v-select
            :programs="programs"
            label="Транслируемая телепердача"
            outlined
        ></v-select>

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
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
         

        
          <v-date-picker
            v-model="date"
            @input="menu2 = true"
            :min=curentDate
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
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            
            v-model="time"
            format='24hr'
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
        

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="font-weight-bold mb-2 mr-1 white--text"
          color="blue-grey darken-1"
          :disabled="!formIsValid"
          right
          elevation="2"
        >
          <v-icon left>mdi-login-variant</v-icon>
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
   
  </div>
</template>

<script>

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
export default {
    data: () =>({
        curentDate: tomorrow.toISOString( ).substring(0,10)
    })
}
</script>

<style> </style>