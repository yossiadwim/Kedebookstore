<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form class="register">
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Register form</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-text-field v-model="username" prepend-icon="mdi-account-outline" name="username" label="Username" type="text"></v-text-field>
            <v-text-field v-model="email" prepend-icon="mdi-email" name="email" label="Email" type="email"></v-text-field>
              <v-text-field v-model="password" prepend-icon="mdi-lock" name="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn rounded color="blue" v-on:click="register()">Sign up</v-btn>

            </v-card-actions>
          </v-card>
        </v-form>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
import {db} from '../db'

export default {
  name:'MyRegister',
  data(){
    return{
    username:"",
      email:"",
      password:""
    }
  },
  methods:{
    register(){

      var user ={

        username : this.username,
        email : this.email,
        password : this.password

      }

      db.collection("user").doc().set(user).then(() => {
          console.log("Register")
        })
      
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
      .then(() => {
        alert("Horee register berhasil")
        this.$router.push('/login')

      })
      .catch((e) =>{
        alert('oops' + e.message)
      })
    }
  }
}
</script>