<template>
<v-app-bar app color="#3853D8" dark>
    <!-- <v-divider vertical class="ml-1 mr-3"></v-divider> -->
    <v-btn icon>
        <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-divider vertical class="ml-5"></v-divider>
    <v-text-field label="Search" class="pt-8 pl-2 d-none d-sm-flex" dark filled solo flat background-color="transparent" rounded outlined 
    v-model="cari">
        
    </v-text-field>
    <v-btn icon v-on:click="search()"><v-icon>mdi-magnify</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
    <v-btn icon class="mx-1" v-on:click="login()">
        <v-icon>mdi-account-outline</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn icon class="mx-1">
        <v-badge color="#94D0EF" content="2">
            <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
    </v-btn>
</v-app-bar>
</template>


<script>

export default {
    name:'MyNavbar',

    data(){
        return{
            cari:""
        }

    },
    methods:{
        login(){
            this.$router.push('/login')
        },
        search(){
            this.$store.commit('setSearch',this.cari)
            this.$router.push('/search')
        }
    
    }
    
}
</script>
<style>
 .v-toolbar_title{
    font-size: 1rem !important;
 }
 .v-badge_badge{
    font-size: 10px !important;
    height: 18px !important;
    min-width: 18px !important;
 }
</style>