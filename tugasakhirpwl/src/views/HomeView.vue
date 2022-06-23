<template>
  <v-app>

    <MyDashboard></MyDashboard>

    
  </v-app>
</template>

<script>

import MyDashboard from '../components/MyDashboard.vue'

  export default {
    name: 'HomeView',

    components: {
        // MyNavbar,
        MyDashboard,

      

    },
  }
</script>
<style scoped>
  .index{
    z-index:9999 ;
  }
</style>
