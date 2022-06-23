<template>
    <v-container fluid>
        <v-carousel v-model="model" cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
            v-for="img in image"
            :key="img.id"
            :src = "img.link_image">

            </v-carousel-item>
        </v-carousel>
            <v-row tile class="mx-16 mt-10 card">
                <v-col cols="12" sm="3" v-for="item in products" :key="item.id">
                    <v-hover v-slot:default="{hover}">
                        <v-card height="450" align="center" flat outlined tile>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="black" small dark>Rp {{item.harga.toLocaleString("id-ID")}}</v-btn>
                            </v-card-actions>
                            <v-img :src=item.link_gambar width="200" height="200" contain></v-img>
                            <v-card-text class="mt-n4">
                                <strong :class="hover ? 'red--text' : 'black--text'">{{item.judul}}</strong>
                            </v-card-text>
                                <v-rating class="mb-2"
                                background-color="orange lighten-3"
                                color="orange"
                                :value= "item.rating"></v-rating>
                            <v-card-text class="mt-n7">
                                <strong :class="hover ? 'red--text' : 'black--text'">{{item.penulis}}</strong>
                            </v-card-text>
                           <v-btn v-on:click="addProductToCart(item,1)" color="orange">Add to Cart</v-btn>
                        </v-card>
                         
                    </v-hover>
                </v-col>
            </v-row>

    </v-container>
</template>



<script>
import {db} from '../db'
import { mapActions } from 'vuex';


export default{
    
    data(){
        return{
            products:[],
            model: 0,
            image: []
        }
        
    },

    
    methods:{

        ...mapActions(['addProductToCart']),
        

    },
        created(){
            db.collection("product")
                    .get()
                    .then((querySnapshot) => {
                        const documents = querySnapshot.docs.map((doc) =>({id: doc.id, ...doc.data()}));
                        this.products = documents;
                    });
            

            db.collection("carousel").get().then((querySnapshot) => {
                const img = querySnapshot.docs.map((doc) => ({
                    id: doc.id, ...doc.data()}))
                    this.image = img
                    console.log(this.image)
                })
    

                    
        }
    
}

</script>
<style>
    .container{
        padding: 0px !important;

    }
    .v-btn.withoutuppercase{
        text-decoration: none;
    }
    .v-chip.v-size--default{
        border-radius: 50px !important;
        font-size: 14px !important;
        height: 40px !important;
        width: 40px !important;

    }
    .v-card--reveal{
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        widows: 100%;
    }
    .card1{
        z-index: 10;

    }
    
</style>
