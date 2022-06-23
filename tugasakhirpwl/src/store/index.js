import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search:"",
    cart:[],
    productsSearch:[]


  },

  getters: {

    cart: state => state.cart,
    cartItemCount(state){
      let totalQty = 0;
      state.cart.forEach(countQty);

      function countQty(item){
        totalQty += item.quantity
      }
      return totalQty

    },
    pencarian(state){
      return state.productsSearch.filter((item) => {
        if((item.judul).toLowerCase().match(state.search.toLowerCase())){
            return (item.judul).toLowerCase().match(state.search.toLowerCase());
        }
        if((item.penulis).toLowerCase().match(state.search.toLowerCase())){
            return (item.penulis).toLowerCase().match(state.search.toLowerCase());
        }
        if((item.genre).toLowerCase().match(state.search.toLowerCase())){
          return (item.genre).toLowerCase().match(state.search.toLowerCase());
      }
        
        
    })
      
    }
   
  },
  mutations: {
    setSearch(state,search){
      state.search = search

    },
    setProdSearch(state,productsSearch){
      state.productsSearch = productsSearch
    },

    addToCart(state,item){
    
      let productInChart = state.cart.find(product => {
        return product.id == item.id
      })

      console.log("ID",item.id)
      
      if(productInChart){
        productInChart.quantity +=1
        console.log(productInChart, "PPPPPPP")
        return
      }
      else{
        console.log(productInChart, "YYYYY")
        state.cart.push({...item,quantity:1})
      }

    },
   

    addQty(state,item){
      let productInChart = state.cart.find(product => {
        return product.id === item.id
      })


      if(productInChart){
        productInChart.quantity += 1
    
      }


    },
    
    minQty(state,item){
   
      for(var i = 0; i < state.cart.length; i++){
        if(item.id == state.cart[i].id){
          state.cart[i].quantity -= 1
          if(state.cart[i].quantity == 0){
            state.cart.splice(i,1)
            break 
          }
        }
        
      }
     
    }
  },
  actions: {

     addProductToCart({commit}, item){
        commit('addToCart', item);
 
     },
     addQtyItem({commit},item){
      commit('addQty',item)
     },
     addMinItem({commit}, item){
      commit('minQty',item)
     }
    
  },
  modules: {
  }
})


