<template>
  <v-container grid-list-xs>
   <v-layout align-center class="info_box">
     <v-flex sm4 xs12 offset-sm1>
       <h1>About Us</h1>
       
     </v-flex>
   </v-layout>

    <v-layout align-center class="info_box" row wrap>
     <v-flex sm3 xs12 offset-sm1>
       <h1>What we do</h1>
       <div id="boks">
         <p>
          Our specialty is low and high-volume standard and bespoke
           complete wheels for a wide range of applications – from the smallest 
          wheelbarrow or trailer to large agricultural or industrial machines and implements.
         </p>
       </div>
     </v-flex>

        <v-flex sm3 xs12 offset-sm1>
       <h1>Best business out there</h1>
       <div id="boks">
         <p>
           With our list of the best online business ideas, you can eliminate a lot of those risks and have more flexibility with the way you work. Plus, with some basic website building know-how and a keen understanding of website maintenance, you can build a website
            that will reach more potential customers.
         </p>
       </div>
     </v-flex>

        <v-flex sm3 xs12 offset-sm1>
       <h1>Our organisation</h1>
       <div id="boks">
         <p>
           We are organised in corporate support functions,
            according to customer segments and work across boarders – because our major customers 
           are present in various countries and work across borders too.
         </p>
       </div>
     </v-flex>
 

   </v-layout>
 </v-container>
</template>

<style lang="scss" scoped>
  .info_box:first-child .flex h1 {
    font-size: 150%;
    padding: 50px;
    
  }

  #boks{
    background-color: rgba(255, 255, 255, 0.678);
  }
  
</style>