<template>
    <div>
        <v-timeline 
            dense
            clipped
            >
            <v-timeline-item :key="stream.id"  v-for="stream in streamList"
                class="mt-8"
                color="blue"
                small
            >

             <template v-slot:icon>
          <v-avatar>
            <img src="https://i.pravatar.cc/64">
          </v-avatar>
        </template>
            <h3>{{stream.time}}</h3>
            </v-timeline-item>      
          </v-timeline>
    </div>
</template>

<script>
export default {
    name: 'StreamList',
    props: {
        streamList: Array 
    },
}
</script>