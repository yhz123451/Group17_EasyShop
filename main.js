import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from 'store/index.js'
Vue.prototype.$store = store;
Vue.config.productionTip = false

Vue.prototype.navigateTo = (options)=>{
	
	if(!store.state.user.loginStatus){
		uni.showToast({
			title:"Login first",
			icon:"none"
		})
		return uni.navigateTo({
			url:"/pages/login/login"
		})
	}
	uni.redirectTo(options)
}



App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif