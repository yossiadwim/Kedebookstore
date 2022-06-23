<template>

    <v-container
      max-width="1500"
      class="mt-10">

    <template>
        <v-card max-width="1200" class="mb-5">
            <v-text class="ml-5"><strong>Masukkan Data Dibawah:</strong></v-text>
            <v-text-field solo filled label="Masukkan Nama Penerima" class="mt-5 ml-5 mr-5" :rules="['Required']" v-model="nama_penerima"></v-text-field>
            <v-text-field solo filled label="Masukkan Alamat" class="ml-5 mr-5" :rules="['Required']" v-model="alamat"></v-text-field>
        </v-card>

        <v-card>
            <v-text class="ml-5 mt-5"><strong>Isi Keranjang:</strong></v-text>
            <v-list-item v-for="item in items" :key="item.id">
                <v-list-item-avatar height="210" width="150" tile>
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


        </v-card>
       
        </template>

      <v-text></v-text>

      <v-card class="mt-5 ">
        <v-card-text><strong>Total: </strong></v-card-text>
        <v-text class="ml-5">Rp {{(totalPrice).toLocaleString("id-ID")}}</v-text>
      </v-card>

      <v-btn class="ma-5" v-on:click="order(items)" color="orange">ORDER NOW</v-btn>
    
    </v-container>

    
 
</template>
        
<script>
import {db} from '../db'
import { mapGetters, mapActions } from 'vuex';
import firebase from 'firebase';


export default {
  name: 'MyCheckOut',
      data(){
        return{
            cari:"",
            items: this.$store.state.cart,
            isLogin:localStorage.getItem("email"),
            nama_penerima:"",
            alamat:"",
            
            
         
        }

    },
    methods:{
        ...mapActions(["addProductToCart","addQtyItem","addMinItem"]),

        searchProd() {
            this.$store.commit("setSearch", this.cari);

            if (this.$router.currentRoute.path != "/search") {
              this.$router.push("/search");
            }

        },
        
        order(items){
            var docData = {
                penerima:this.nama_penerima,
                alamat_penerima:this.alamat,
                tanggal:firebase.firestore.Timestamp.now(),
                cart:items,
                total: this.totalPrice

            }

            if(this.penerima != "" && this.alamat != ""){
                db.collection("cart").doc().set(docData).then(() => {
                alert("Berhasil melakukan order, Terimakasih")
            })
            }
            else{
              alert("Nama penerima atau Alamat masih kosong")
            }


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