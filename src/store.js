import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export const store = new Vuex.Store({
export default new Vuex.Store({
    state: {
        cartItems: 0,
        showCartItems: false,
        darkMode: true,
        vehicles: []
    },
    getters: {
        
    }
})