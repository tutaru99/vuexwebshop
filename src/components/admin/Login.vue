<template>
   <v-container>
       <v-row>
           <v-col id="forma" offset-md="3" md="6" xs="12">
               <h1 class="text-center font-weight-black">Administrator Login</h1>
               <div id="info">
                   <v-text-field v-model="email" label="Email" required>
                   </v-text-field>
                <v-text-field type="password" v-model="password" label="Password" required>

                 </v-text-field>
                
                 <v-btn class="mr-5 text-center font-weight-black" color="#241575" text="white" @keyup.enter.native="signIn()" @click.prevent="signIn()">
                      <v-icon>mdi-login</v-icon>Login
                 </v-btn>
                 <v-btn class="mr-5 text-center font-weight-black" color="#241575" text="white" to="/Register">
                      <v-icon>mdi-login</v-icon>Register
                 </v-btn>
                  
                     <v-btn class="text-center font-weight-black" color="red" text="white" @click.prevent="signOut()">
                    Logout <v-icon>mdi-logout</v-icon>
                 </v-btn>
               </div>

           </v-col>
       </v-row>
   </v-container>
</template>

<script>
import Register from '../admin/Register'
import firebase from 'firebase'
import 'firebase/firestore'
    export default {
        data() {
            return {
                email:'',
                password: '',
            }
        },
        methods: {
            signIn() {
               firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                this.$router.replace('/menu')
               })
           .catch(function(error){
               var errorCode = error.errorCode
               var errorMessage = error.message;
               if (errorCode === 'auth/wrong-password') {
                   alert ("Wrong Password")
               } else {
                   alert (errorMessage)
               }
               console.log(error)
           })
        },

    signOut() {
               firebase.auth().signOut().then(() => {
                   alert ('Logged Out');
                   this.$router.replace('/')
               }).catch(error => {
                   alert(error)
               })
            }
        },
    mounted() { //causes a bug to login without credentials pressing enter anywhere on any pagge
            window.addEventListener('keyup', stuff =>  {
                if (stuff.keyCode === 13) {
                    this.signIn()
                    
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
#info {
    padding: 20px;
    opacity: 0.9;
}
</style>