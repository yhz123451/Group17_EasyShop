export default{
	state:{
		list:[],
		selectedList:[],
		selectedGoodsList:[]
	},
	getters: {
		checkedAll(state){
			return state.list.length === state.selectedList.length;
		},
		//合计结算数量
		totalCount(state){
			let total = {
				price:0,
				num:0
			}
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id) > -1){
					console.log(v)
					total.price += Number(v.price)*Number(v.num);
					console.log(Number(v.price)*Number(v.num))
					total.num = state.selectedList.length;
				}
			})
			return total;
		}
	},
	mutations: {
		//全选
		checkAll(state){
			state.selectedList = state.list.map(v=>{
				v.checked = true;
				return v.id;
			})
			state.list.map(v=>{
				state.selectedGoodsList.push(v)
			})
		},
		//非全选
		unCheckAll(state){
			state.list.forEach(v=>{
				v.checked = false;
			})
			state.selectedList=[];
			state.selectedGoodsList=[];
		},
		//单选
		selectedItem(state,index){
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			//如果selectedList已经存在就代表该商品已经被选择了，checked=false，并且在selectedList里面删除
			if(i > -1){
				state.list[index].checked = false;
				return state.selectedList.splice(i,1);
			}
			//如果之前没有选中，把当前id添加到selectedList里面，checked=true
			state.list[index].checked = true;
			state.selectedList.push(id);
			state.selectedGoodsList.push(state.list[index])
		},
		delGoods(state){
			console.log("删除")
			// state.list = state.list.filter(v=>{
			// 	return state.selectedList.indexOf(v.id) === -1;
			// })
			let selectDel = []
			for (let i = state.list.length - 1; i >= 0; i--) {
			    if (state.selectedList.indexOf(state.list[i].id) !== -1) {
					selectDel.push(state.list[i].wid)
			        state.list.splice(i, 1);
			    }
			}
			uni.setStorageSync('delGoods',JSON.stringify(selectDel));
		},
		//加入购物车
		addShopList(state,goods){
			state.list.push(goods);
		},
		delAll(state){
			state.list= [];
			state.selectedList=[];
			state.selectedGoodsList=[];
		}
	},
	actions: {
		checkedAllFn({commit,getters}){
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll")
		},
		delGoodsFn({commit}){
			commit('delGoods');
			commit('unCheckAll');
			uni.showToast({
				title:'Deleted successfully',
				icon:"none"
			})
		}
	}
}