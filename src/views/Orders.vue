<template>
    <v-container fluid>
        <v-row>
            <v-col offset-md="2" md="8">
                 <h1 class="text-center">Orders</h1>
                <div class="pa-2" id="info"> 
                   <v-row class="ma-0">
                       <v-col cols="12" md="1" class="pa-2">
                           <p class="font-weight-bold body-1 pl-1 darkgrey--text">
                            Info:
                           </p>
                       </v-col>
                        <v-col cols="12" md="5" class="pa-2 pl-5">
                         <v-row align="center">
                             <div id="status_box" class="complete">Completed</div>
                             <span class="font-weight-light caption pl-1">Done</span>
                         </v-row>

                                                  <v-row align="center">
                             <div id="status_box" class="orange">In-Progress</div>
                             <span class="font-weight-light caption pl-1">Somebody working on it?</span>
                         </v-row>

                                                  <v-row align="center">
                             <div id="status_box" class="incomplete">Not Started</div>
                             <span class="font-weight-light caption pl-1">Not yet started</span>
                         </v-row>
                           
                       </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                         <v-row>
                            <div id="status_box" class="complete">Completed</div>
                            <div id="status_box" class="orange">In-Progress</div>
                            <div id="status_box" class="incomplete">Not Started</div>
                         </v-row>
                            <p class="font-weight-light caption pl-1">
                            <b>Single-click</b> to switch stage : complete => in progress => <b>double-click</b> the box to reset to 'not started'
                           </p>
                           <span class="font-weight-light caption pl-1">
                               <v-icon color="grey">archive</v-icon>
                               Archive to 'hide' from orders list
                           </span>
                       </v-col>
                   </v-row>
                </div>
                <!-- Orders list area -->
                <div class="pa-2 mt-1" id="info">
                     <p class="font-weight-bold body-1 pa-3 darkgrey--text">
                            Orders:
                    </p>
                    <v-simple-table id="menu-table">
                        <thead>
                        <tr>
                            
                            <th class="text-left" style="width:10%;">Order No.</th>
                            <th class="text-left" style="width:10%;">QTY</th>
                            <th class="text-left" style="width:40%;">Item</th>
                            <th class="text-left" style="width:10%;">Price</th>
                            <th class="text-left" style="width:10%;">Status</th>
                            <th class="text-left" style="width:10%">Archive item</th>
                            <th class="text-left" style="width:10%">Remove</th>
                        </tr>
                        </thead>
                        <tbody class="font-weight-light">
            <tr v-for="item in orderItems" :key="item.name">
                <td>{{ item.orderNumber }}</td>
                <td class="py-3"><p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.quantity }}</p></td>
                <td class="py-3"><p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.name }}</p></td>
                <td class="py-3"><p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.price }}</p></td>
                <td> <div id="status_box" class="orange" @click="switchStage(item.id)" v-bind:class="item.status" >{{ item.status }}</div></td> 
                    <td> 
                    <v-btn small text v-on:click="addToBasket(item)">
                    <v-icon color="darkgrey"> archive </v-icon>
                    </v-btn>
                </td>
                             <td> 
                                <v-btn small text @click="deleteOrderItem(item.id)">
                                <v-icon color="black"> delete </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                     </v-simple-table>
                </div>
            </v-col>
         <!--    <v-col  offset-md="0" md="4">
                  <h1>Revenue</h1>
                <div class="pa-2" id="info">
                Revenue
                </div>
                 <div class="pa-2 mt-1" id="info">
                Completed Orders 
                </div>
            </v-col> -->
        </v-row>
    </v-container>
</template>

<script>
import { dbMenuAdd, dbOrders } from '../../firebase'

   export default {
    data () {
      return {
        basketDump: [],
      
      }
      },
    beforeCreate() {
        this.$store.dispatch('setOrderItems')
        console.log("test", this.$store.state.orderItems)
    },

    methods: {
    deleteOrderItem(id) {
    dbOrders.doc(id).delete().then(function() {
        
        })
        .catch(function(error) {
       
        });
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
    },

        switchStage(id) {
           /*  dbOrders.doc(id).update({status}).then (() => { }) */
            let selectedOrderItem = this.orderItems.filter(item => item.id === id) [0];
        

        if (selectedOrderItem.status === "inprogress") {
            dbOrders.doc(id).update({status:"complete"}).then(() => {

            })
        }
        else if (selectedOrderItem.status === "incomplete") {
            dbOrders.doc(id).update({status:"inprogress"}).then(() => {

            })
        }
        else if (selectedOrderItem.status === "complete") {
            dbOrders.doc(id).update({status:"incomplete"}).then(() => {

            })
        }
    }

  },
  computed: {
      basket() {
   // return this.$store.state.basketItems
    return this.$store.getters.getBasketItems
      },
      orderItems() {
          return this.$store.getters.getOrderItems
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
          var deliveryPrice = 10;
          var totalCost = this.subtotal 
          return totalCost + deliveryPrice
      }
  }
  }
</script>

<style lang="scss" scoped>
#status_box{
    display: flex;
    justify-content: center;
    align-content: center;
    height: 35px;
    width: 90px;
    font-size: 12px;
    border-radius: 2px;
    margin: 5px 0;
    color: map-get($colorz, white );
    text-shadow: 1px 1px 1px #aaa;
}
#info{
    opacity: 0.9;
}
</style>