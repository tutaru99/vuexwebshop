<template>
 <v-container  grid-list-xs>
   <v-layout align-center>
     <v-flex sm6 xs12 offset-sm3>
       <h1 class="text-center" id="slogan">Simas' Brilliant Store!</h1>
       <h2 class="text-center">Technology and neat Posters</h2>
     </v-flex>
   </v-layout>

    <v-layout align-center class="info_box" row wrap>
<v-flex sm3 xs12 offset-sm1>
       <h1>Featured Product</h1>
              <div id="boxas">
                 <div id="sumting" class="container">
           <img  v-bind:src="menuItems[0].image"> 
           </div>
             <br>
           <h2 class="text-center " id="titel"> {{menuItems[0].name}} </h2>
            <br>
            
            <p class="text-right"><v-btn class="mr-5 text-center font-weight-black" color="#241575" text="white" to="/menu">
                       Store
              </v-btn>Price: {{menuItems[0].price}}€</p>
         
       </div>
     </v-flex>
        <v-flex class="pb-7 mb-2" sm3 xs12 offset-sm1>
       <h1 class="font-weight-black" >Most Popular</h1>
       <div id="boxas">
            <div id="sumting" class="container">
           <img v-bind:src="menuItems[1].image">
           </div>
             <br>
           <h2 class="text-center " id="titel"> {{menuItems[1].name}} </h2>
            <br>
            
            <p class="text-right"><v-btn class="mr-5 text-center font-weight-black" color="#241575" text="white" to="/menu">
                       Store
              </v-btn>Price: {{menuItems[1].price}}€</p>
         
       </div>
     </v-flex>

        <v-flex sm3 xs12 offset-sm1>
       <h1>Newest Product</h1>
              <div id="boxas">
                 <div id="sumting" class="container">
           <img  v-bind:src="menuItems[2].image"> 
           </div>
             <br>
           <h2 class="text-center " id="titel"> {{menuItems[2].name}} </h2>
            <br>
            
            <p class="text-right"><v-btn class="mr-5 text-center font-weight-black" color="#241575" text="white" to="/menu">
                       Store
              </v-btn>Price: {{menuItems[2].price}}€</p>
         
       </div>
     </v-flex>
 

   </v-layout>
 </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase'
export default {
  
  components: {
    
  },
      beforeCreate() {
        this.$store.dispatch('setMenuItems')
    },
     computed: {
  
      menuItems() {
          return this.$store.getters.getMenuItems
      },
     
  }
  
};
</script>

<style lang="scss">
  .info_box .flex h1 {
   @include infobox_mixin(5px, map-get($colorz, white), 10px, 5px, map-get($colorz, white));
   //I kinda got out of the previous struggles but I couldn't solve this. this is the  error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    text-align: center;
  }
  .info_box .flex div {
    background-color: white;
    padding: 10px;
  }

  .layout:first-child {
    height: 30vh;
  }
  .layout:last-child {
    height: 40vh;
  }

  h1{
    font-family: 'Montserrat', sans-serif;
  }
#slogan{
  color: white;
  font-size: 42px !important;
  letter-spacing: 6px;
}
h2{
  color: white;
}
#titel{
  color: rgb(0, 0, 0);
}
#boxas{
  background-color: rgba(255, 255, 255, 0.699);
  height: 340px;

}


.container img {
  width: 100%;
  padding: 0;
 
  
}
#sumting{
  padding: 0;
  background-color: #ffffff00;
}
p{
  font-size: 14px;
}


</style>