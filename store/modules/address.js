export default {
	state: {
		list: [
			// {
			// 	name:"Hannah",
			// 	tel:"0474288011",
			// 	city:"Wollongong",
			// 	details:"56 New Dapto Rd.",
			// 	state:"NSW",
			// 	postcode:"2500",
			// 	isDefault:false
			// },
			// {
			// 	name:"Harry",
			// 	tel:"0474288010",
			// 	city:"Wollongong",
			// 	details:"3 Crown Street",
			// 	state:"NSW",
			// 	postcode:"2500",
			// 	isDefault:true
			// },
		]
	},
	getters: {
		defaultPath(state) {
			return state.list.filter(v=>v.isDefault);
		}
	},
	mutations: {
		updateAddressList(state,newList){
			state.list = newList
			// for (let i = 0; i < newList.length; i++) {
			// 	state.list.push(newList[i])
			// }
		},
		createPath(state,obj){
			state.list.unshift(obj);
		},
		updatePath(state,{index,item}){
			for(let key in item){
				state.list[index][key]=item[key]; 
			}
		},
		//把选中的变为未选中
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault = false;
				}
			})
		}
	},
	actions: {
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit("removePath");
			}
			commit('createPath',obj);
		},
		updatePathFn({commit},obj){
			if(obj.item.isDefault){
				commit("removePath");
			}
			commit('updatePath',obj);
		}
	}
}