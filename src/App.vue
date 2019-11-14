<template>
  <v-app id="app">
    <navigation />
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

  import Navigation from './components/Navigation';

  export default {
    components: {
    Navigation,
  },
    name: 'App',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Exo+2|Montserrat&display=swap');
*{
font-family: 'Exo 2', sans-serif;
}
::-webkit-scrollbar {
    display: none;
}
//Strange, cause here it works! 
main {
 background-image: url('./assets/2.jpg');
 background-size: cover;
background-position: center;
  
}
  .col:last-child h1 {
  text-align: left;
}

#info {
  background-color: white;
}
.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  //I kinda got out of the previous struggles but I couldn't solve this. this is the  error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}
</style>