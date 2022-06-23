<template>
  <v-app>
    <v-app-bar app color="black" dark height="70px">
      <router-link to="/" class="link">
        <v-btn color="transparent" elevation="0">Ke De Book Store</v-btn>
      </router-link>
      
  
      <v-spacer></v-spacer>
     
      <v-text-field label="Search" class="mr-5 pt-8 pl-2 d-none d-sm-flex shrink" light filled solo background-color="white" rounded  
        v-model="cari" v-on:keyup.enter="searchProd()">
      
        </v-text-field>
       <v-btn fab small v-on:click="searchProd()" class="mr-1" color="black"><v-icon>mdi-magnify</v-icon></v-btn>

    <v-menu offset-y
    :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn

          v-bind="attrs"
          v-on="on"
          icon
          class="mx-1">
        
        <v-badge color="black" :content="cartItemCount">
          <v-icon>mdi-cart-plus</v-icon>
        </v-badge>
          
        </v-btn>

      </template>
      
    <v-card
      elevation="16"
      max-width="1200"
      class="mx-auto"
    >
      <v-virtual-scroll
        :bench="benched"
        :items="items"
        height="300"
        item-height="150"
        width="800"
      >
        <template v-slot:default="{ item }">

          <v-list-item :key="item.id">
            <v-list-item-avatar height="110" width="80" tile>
                <v-img :src="item.link_gambar"></v-img>
              </v-list-item-avatar>


            <v-list-item-content>
              <v-list-item-title>
                {{item.judul}}
              </v-list-item-title>
              <v-list-item-title>
                {{item.quantity}} x Rp {{(item.harga).toLocaleString("id-ID")}}
              </v-list-item-title>
              <v-list-item-title>
                Sub Total: Rp {{(item.quantity*item.harga).toLocaleString("id-ID")}}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-icon>
                <v-btn icon class="mr-2" v-on:click="addMinItem(item)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <v-text class="mt-2">{{item.quantity}}</v-text>

                <v-btn icon class="ml-2" v-on:click="addQtyItem(item)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item-content>

          </v-list-item>


        </template>
      </v-virtual-scroll>
      <v-text></v-text>
    <v-btn class="ma-5" v-on:click="checkOut()">Checkout (Rp {{ totalPrice.toLocaleString("id-ID") }})</v-btn>
    </v-card>

    </v-menu>

        <v-menu offset-y
    :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn

          v-bind="attrs"
          v-on="on"
          icon
          class="mx-1">
        
          <v-icon>mdi-account</v-icon>
          
        </v-btn>

      </template>
      
    <v-card
      elevation="10"
      max-width="500"
      class="mx-auto"
    >

        <template>

          <v-list-item v-show="isLogin">

           <v-list-item-content >
              <v-list-item-title >
                {{email}}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>

          <v-btn class="ma-5" v-on:click="login()" v-if="isLogin == null">Login</v-btn>
          <v-btn class="ma-5" v-on:click="logout()" v-else>Logout</v-btn>
        </template>



    </v-card>

    </v-menu>



    
    </v-app-bar>
    <v-content>
      <router-view>

      </router-view>
    </v-content>
  </v-app>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import firebase from 'firebase';
import { db } from './db'

export default {
  name: 'App',
      data(){
        return{
            cari:"",
            items: this.$store.state.cart,
            user:[],
            email:localStorage.getItem("email"),
            isLogin: localStorage.getItem("isLogin"),
            closeOnContentClick: false,
        }

    },

    
    created(){
        db.collection("user")
                    .get()
                    .then((querySnapshot) => {
                        const documents = querySnapshot.docs.map((doc) =>({id: doc.id, ...doc.data()}));
                        this.user = documents;

                    });

      // if(localStorage.getItem("email") && localStorage.getItem("password")){
      //      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      // .then(
      //   () => {
      //     localStorage.setItem("email",localStorage.setItem("email"))
      //     localStorage.setItem("password",localStorage.setItem("password"))
          
      //   },

      // )
      // }

      

      

    },
    methods:{
      ...mapActions(["addProductToCart","addQtyItem","addMinItem"]),
      
        login(){
            
            if(this.$router.currentRoute.path != "/login"){
                this.$router.push('/login')
            }
              
            
        },

        logout(){
          firebase.auth().signOut()
          localStorage.removeItem("email")
          localStorage.removeItem("password")
          localStorage.removeItem("isLogin")
          location.reload()
        },



        searchProd() {
            this.$store.commit("setSearch", this.cari);

            if (this.$router.currentRoute.path != "/search") {
              this.$router.push("/search");
            }

        },

        checkOut(){
          this.$router.push('/checkout')
          this.$store.state.cart
        }
    
    },
    computed:{
      ...mapGetters(["cart"]),
      
      cartItemCount(){
        if(this.$store.getters.cart.length < 1){
          return "0"
        }
        else{
          return this.$store.getters.cartItemCount
        }
        
      },
      totalPrice(){
        return  this.cart.reduce((a, b) => a + b.quantity * b.harga, 0);
      }
    }
};
</script>
<style scoped>
  .link{
    text-decoration: none;
  }
</style>