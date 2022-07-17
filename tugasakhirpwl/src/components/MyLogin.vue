<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form class="login">
          <v-card class="elevation-12">
            <v-toolbar dark color="black">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <!-- <v-text-field v-model="username" prepend-icon="mdi-account-outline" name="login" label="Username" type="text"></v-text-field> -->
              <v-text-field v-model="email" prepend-icon="mdi-email" name="email" label="Email" type="email"></v-text-field>

              <v-text-field v-model="password" prepend-icon="mdi-lock" name="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-text>Belum punya akun?</v-text>
              <v-btn round v-on:click="register()" class="ml-1">Sign up</v-btn>
              <v-spacer></v-spacer>
              <v-btn round color="orange"  @click.prevent="login()">
                Login
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'


export default {
  name:'MyLogin',
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods:{
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then(
        () => {
          alert("Login berhasil, Horeee")
          localStorage.setItem("email",this.email)
          localStorage.setItem("isLogin",true)
          this.$router.push("/")
          location.reload()
        },
        err => {
          alert(err)
        }
      )
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>