<template>
    <div>
 <v-navigation-drawer
 color="primary"
      v-model="drawer"
      app>
      <ul>
          <router-link tag="li" to="/" > <v-icon color="orange">home</v-icon> Home</router-link>
           <router-link tag="li" to="/menu" > <v-icon color="orange">restaurant_menu</v-icon>List</router-link>
            <router-link tag="li" to="/about"> <v-icon color="#FFB936">info</v-icon> About</router-link>
      </ul>
    </v-navigation-drawer>

    <v-app-bar
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">
          <span>NORDSKOV WATCHES</span>
          <span class="font-weight-light"> DENMARK</span>

          </v-toolbar-title>
    </v-app-bar>

    </div>
</template>

<script>
    export default {
          data: () => ({
      drawer: null,
    }),
    }
</script>

<style lang="scss" scoped>
    nav ul {
        padding: 0;
        margin-top: 20px;
        text-decoration: none;
    }

    nav li {
        //scss doesn't work 
        color: orange;
        margin-left: 15%;  
        padding: 5px 20px;
        list-style-type: none;
        cursor: pointer;
    }

    nav li i {
        margin-right: 10px;
    }

    nav li:last-child {
        position: absolute;
        bottom: 40px;
        color: #FFB936;
    }
</style>