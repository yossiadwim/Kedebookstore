<template>
  <v-app>

    <MyDashboard></MyDashboard>
    <MyFooter></MyFooter>


    
  </v-app>
</template>

<script>

import MyDashboard from '../components/MyDashboard.vue'
import MyFooter from '../components/MyFooter.vue'

  export default {
    name: 'HomeView',

    components: {

        MyDashboard,
        MyFooter

      

    },
  }
</script>
<style scoped>
  .index{
    z-index:9999 ;
  }
</style>
