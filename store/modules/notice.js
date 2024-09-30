export default{
	state:{
		list:[],
	},
	getters: {
	},
	mutations: {
		//全选
		checkAll(state){
			state.selectedList = state.list.map(v=>{
				v.checked = true;
				return v.id;
			})
			state.selectedList = state.list.map(v=>{
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
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1;
			})
		},
		//加入购物车
		addShopList(state,goods){
			state.list.push(goods);
		},
		delAll(state){
			state.list= [];
			state.selectedList=[];
			state.selectedGoodsList=[];
		},
	},
	actions: {
	}
}