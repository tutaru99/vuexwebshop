<template>
  <v-container>


     <v-snackbar top
      v-model="updatedSuccess"
    >
      {{ updatedText }}
      <v-btn
        color="pink"
        text
        @click="updatedSuccess = false"
      >
        Close
      </v-btn>
    </v-snackbar>


    <v-row class="mt-5 pt-5">
      <v-col offset-md="1" md="10">
        <h1 class="text-center">Admin Panel</h1>
                   
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width:40%;">Name of the Product</th>
                <th class="text-left" style="width:100px">Price</th>
                <th class="text-center" style="width:100px">Image</th>
                <v-btn color="red" small text to="/addNew">
                  <v-icon>mdi-new-box</v-icon>
                  <span class="text-center font-weight-black" style="padding:0 10px;">Add New Product</span>
                </v-btn>
                <th class="text-left pl-7" style="width:100px">Edit</th>
                <th class="text-left pl-5" style="width:100px">Remove</th>
                  <v-btn class="text-center font-weight-black" text="white" color="red" @click.prevent="signOut()">
                     Logout<v-icon>mdi-logout</v-icon>
                 </v-btn>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.name">
                <td>
                  <span id="td_name">{{ item.name }}</span>
                  <br/>
                  <span id="menu_item_description">{{ item.description }}</span>
                </td>
                <td>{{ item.price }}</td>
                <td>
                <v-img height="50" width="50" v-bind:src="item.image"></v-img>
                </td>
                <td>
                
                </td>
                <td>
                  <v-btn small text @click.stop="dialog = true" @click="editItem(item)">
                    <v-icon color="black">mdi-square-edit-outline</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn small text @click="deleteItem(item.id)">
                    <v-icon color="black">delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
    <v-row>
       <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
                        <h1 class="text-center">Edit Item</h1>
                <div class="pa-5" id="info1">
                  
                   <v-text-field v-model="item.name"></v-text-field>
                   <v-text-field v-model="item.description"></v-text-field>
                   <v-text-field v-model="item.price"></v-text-field>
                   <v-text-field v-model="item.image"></v-text-field>
                
                   <v-btn class="mr-5" color="#241575" text @click="updateItem()"
                   @click.stop="dialog = false">
                       Edit Item
                   </v-btn>
                   <v-btn color="red" text
                    @click.stop="dialog = false">
                       Cancel
                   </v-btn>
                </div>
      </v-card>
    </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";
import firebase from 'firebase'
import 'firebase/firestore'
// import store from '../store.js'
export default {
  data() {
    return {
      basket: [],
      dialog: false,
      item: [],
      activeEditItem: null,
      updatedSuccess: false,
      updatedText: 'Menu Item has been updated !'
    }
  },
  beforeCreate() {
    this.$store.dispatch('setMenuItems')
  },

  methods: {
        signOut() {
               firebase.auth().signOut().then(() => {
                   alert ('Logged Out');
                   this.$router.replace('/')
               }).catch(error => {
                   alert(error)
               })
            },
      editItem(item){
        this.item = item
        this.activeEditItem = item.id
      },
      updateItem() {
        
dbMenuAdd.doc(this.activeEditItem).update(this.item).then(() => {
    this.updatedSuccess = true;
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
    
  },
    deleteItem(id) {
      dbMenuAdd.doc(id).delete().then(function() {
        
        })
        .catch(function(error) {
       
        });
    },
    addToBasket(item) {
      this.basket.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  },
 
  computed: {
    menuItems() {
    return this.$store.getters.getMenuItems
    },
    subtotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var deliveryPrice = 10;
      var totalCost = this.subtotal;
      return totalCost + deliveryPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, rgb(0, 0, 0)),
    10px,
    5px,
    map-get($colorz, rgb(0, 0, 0))
  );
  //I kinda got out of the previous struggles but I couldn't solve this. this is the  error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}
.col:last-child h1 {
  text-align: left;
}

#info {
  background-color: rgb(0, 0, 0);
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
#info1{
  opacity: 0.8;
}
</style>