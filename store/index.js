import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

import wishlist from './modules/wishlist.js'
import address from './modules/address.js'
import user from './modules/user.js'
// import account from 'modules/account.js'
export default new Vuex.Store({
	modules: {
		wishlist,
		address,
		user,
		// account
	}
})