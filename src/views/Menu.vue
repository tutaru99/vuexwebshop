<template>
    <v-container>
        <v-row>
<!--             <v-col offset-md="1" md="5">
                 <h1>Store</h1>
                <div class="pa-2" id="info">
                    <v-simple-table id="menu-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-left" style="width:70%;">Name of the product</th>
                            <th class="text-left" style="width:100px">Price</th>
                            <th class="text-left" style="width:100px">Add to basket</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in menuItems" :key="item.name">
                            <td id="td_menuItem_img">
                            <v-img v-bind:src="item.image"></v-img>
                            </td>
                            <td>
                                <span id="td_name">{{ item.name }}</span><br>
                                <span id="menu_item_description">{{ item.description }}</span>
                            </td>
                            <td>{{ item.price }}€</td>
                            <td> 
                                <v-btn small text v-on:click="addToBasket(item)">
                                <v-icon color="black"> mdi-cart-plus </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                     </v-simple-table>
                </div>
            </v-col> -->
                                      <!-- cards -->
       
   
      
     <v-col id="store" class="text-center" offset-md="1" md="4">
         <br>
         <br>
         <br>
         
    <h1 class="text-center">Products</h1>
    </v-col>
         
    <v-col  v-if="currentUser" offset-md="1" md="6">
    <h1 class="text-center">Current basket</h1>
    <div class="pa-2" id="info">
    <v-simple-table id="menu-table" v-if="basket.length > 0"  >
    <thead>
    <tr>
        <th class="text-left" style="width:30%;">Quantity</th>
        <th class="text-left" style="width:50%">Name of item</th>
        <th class="text-left" style="width:20%">Price €</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in basket" :key="item.name">
        <td>
                <v-icon color="black" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
            {{ item.quantity }}
            <v-icon color="black" @click="increaseQtn(item)">add_box</v-icon>
        </td>
        <td>{{ item.name }}</td>
        <td> {{ item.price }} €</td>
    </tr>
    </tbody>

    
    </v-simple-table>
    <v-simple-table v-else>
        <p>The basket is empty.. Why don't we add something?</p>
    </v-simple-table>
    <v-divider></v-divider>
    <v-row  id="basket_checkout" class="mt-4" style="margin=0;">
        <v-col>
        <p>Subtotal:</p>
        <p>Delivery:</p>
        <p>Total amount:</p>
        </v-col>
        <v-col class="text-right">
            <p> {{ subtotal }} €</p>
        <p><b>{{ delivery }}</b>  <br>
        </p>
        
        <p><b> {{ total }} €</b></p>
        </v-col>
    </v-row>
    <v-row style="margin=0;">
            <v-spacer></v-spacer>
                        
    <v-btn class="mr-2" color="orange" @click="addCheckoutItem()"><v-icon>mdi-cart-arrow-right</v-icon>Checkout</v-btn>
                </v-row>
                </div>
                </v-col>
            
            <v-card
            v-for="item in menuItems" :key="item.name"
            class="mx-auto ml-5 mb-7 pb-6"
            max-width="250"
        >
            <v-img
            class="white--text align-end"
            height="200px"
            v-bind:src="item.image">
            <v-card-title > <h1 id="cardTitle">{{ item.name }}</h1></v-card-title>
            </v-img>
            <v-card-subtitle id="price" class="pa-1" >Price: {{ item.price }} €</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{ item.description }}</div>
            </v-card-text>
            <br>
        <v-btn id="cart" class="font-weight-black" color="#241575" 
        text="white" small v-on:click="addToBasket(item)">Add to cart
        <v-icon color="black"> mdi-cart-plus </v-icon>
        </v-btn>
        </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase'

   export default {
    data () {
      return {
        basketDump: [],
      
      }
      },
    beforeCreate() {
        this.$store.dispatch('setMenuItems')
    },

    methods: {
        addCheckoutItem() {
         this.$store.dispatch('setCheckoutItem')   
        },
        addToBasket(item) {
            
/*    */


    this.basketDump.push({
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
                this.$store.commit('addBasketItems', this.basketDump);
                this.basketDump = [];
    },
    increaseQtn(item) {
        item.quantity++
    },
    decreaseQtn(item){
        item.quantity--;

        if (item.quantity === 0 ){
            this.basket.splice(this.basket.indexOf(item), 1)
        }
    },
    reset() {
        this.subtotal = null,
        this.total = null
    }
        
  },
  computed: {
      basket() {
   // return this.$store.state.basketItems
    return this.$store.getters.getBasketItems
      },
      menuItems() {
          return this.$store.getters.getMenuItems
      },
      subtotal () {
          var subCost = 0;
        for( var items in this.basket) {
            var individualItem = this.basket [items];
            subCost += individualItem.quantity * individualItem.price;
        }
        return subCost
      },
      total () {
          var deliveryCost = 0;
          var totalCost = this.subtotal;
          if (totalCost == 0) {
            totalCost = totalCost
          }
          
        
         else if (totalCost <= 200) {
            totalCost = totalCost + 20
          }
          return totalCost + deliveryCost
          
      },
      delivery() {
      var deliveryCost = 0;
      if (this.subtotal >= 200) {
        deliveryCost = "Free delivery!";
      }
          else if (this.subtotal >= 100){
            deliveryCost = 20 + " €"
          }
          else if (this.subtotal == 0){
            deliveryCost = 0 + " €"
          }
          else {
            deliveryCost = 20 + " €"
          }
      return deliveryCost;
    },

      currentUser() {
            return this.$store.getters.currentUser
        }
  }
  }
</script>

<style lang="scss" scoped>
 #cardTitle{
     text-transform: uppercase;
     font-size: 16px;
     background-color: black;
     padding: 4px 16px;
    
 }
 

 #info {
     background-color: white;
     border-radius: 3%;
     opacity: 0.9;
 }
 tr th {
     font-weight: 300;
 }
 #td_name {
     font-weight: bold;
 }
tr td {
    padding: 10x 10px 10px 16px;
}
#menu_item_description {
    font-style: italic;
    font-weight: 300;
    color: darkgray;
    font-size: 13px;
}

#basket_checkout {
    font-size: 13px;

}
#basket_checkout p:first-child {
    line-height: 2px;
}
#td_menuItem_img{
    max-width:40px;
    max-height: 40px;
    padding: 0; 
}
#price{
    margin-left: 140px;
}
#cart{
     margin-left: 110px;
}

#store h1{
    font-size: 31px;
    padding: 20px;
    color: white;
   
}
</style>