const tagBasic_out: Tag[] = [
	{id: '1', name:'餐饮', icon:'can_yin'}, 
	{id: '2', name:'住宿', icon:'zhu_su'}, 
	{id: '3', name:'出行', icon:'chu_xing'}, 
	{id: '4', name:'衣装', icon:'yi_zhuang'}, 
	{id: '5', name:'娱乐', icon:'yu_le'},
	{id: '6', name:'日用', icon:'ri_yong'},
];
const iconMap = [
	{name:'默认', icon_name:'default'}, 
	{name:'add', icon_name:'add'}, 
	{name:'餐饮', icon_name:'can_yin'}, 
	{name:'住宿', icon_name:'zhu_su'}, 
	{name:'出行', icon_name:'chu_xing'}, 
	{name:'衣装', icon_name:'yi_zhuang'}, 
	{name:'娱乐', icon_name:'yu_le'},
	{name:'化妆品', icon_name:'hua_zhuang_pin'},
	{name:'日用', icon_name:'ri_yong'},
	{name:'外卖', icon_name:'wai_mai'},
	{name:'零食', icon_name:'ling_shi'},
	{name:'烟酒', icon_name:'yan_jiu'},
	{name:'数码', icon_name:'shu_ma'},
	{name:'游戏', icon_name:'you_xi'},
	{name:'通讯费', icon_name:'tong_xun_fei'},
	{name:'水电费', icon_name:'shui_dian_fei'},
	{name:'运动健身', icon_name:'yun_dong_jian_shen'},
	{name:'旅游', icon_name:'lv_you'},
	{name:'健康', icon_name:'jian_kang'},
	{name:'医疗', icon_name:'yi_liao'},
	{name:'教育', icon_name:'jiao_yu'},
	{name:'宠物', icon_name:'chong_wu'},
	{name:'珠宝', icon_name:'zhu_bao'},
	{name:'轻奢', icon_name:'qing_she'},
	// income
	{name:'工资', icon_name:'gong_zi'},
	{name:'奖金', icon_name:'jiang_jin'},
	{name:'营业', icon_name:'ying_ye'},
	{name:'兼职', icon_name:'jian_zhi'},
	{name:'报销', icon_name:'bao_xiao'},
	{name:'投资', icon_name:'tou_zi'},
	{name:'零花', icon_name:'ling_hua'},
];
const iconList: Tag[] = [
	{id:'1', name:'餐饮', icon:'can_yin'}, 
	{id:'2', name:'住宿', icon:'zhu_su'}, 
	{id:'3', name:'出行', icon:'chu_xing'}, 
	{id:'4', name:'衣装', icon:'yi_zhuang'}, 
	{id:'5', name:'娱乐', icon:'yu_le'},
	{id:'6', name:'日用', icon:'ri_yong'},
	{id:'7', name:'外卖', icon:'wai_mai'},
	{id:'8', name:'零食', icon:'ling_shi'},
	{id:'9', name:'烟酒', icon:'yan_jiu'},
	{id:'10', name:'化妆品', icon:'hua_zhuang_pin'}, 
	{id:'11', name:'数码', icon:'shu_ma'},
	{id:'12', name:'游戏', icon:'you_xi'},
	{id:'13', name:'通讯费', icon:'tong_xun_fei'},
	{id:'14', name:'水电费', icon:'shui_dian_fei'},
	{id:'15', name:'运动健身', icon:'yun_dong_jian_shen'},
	{id:'16', name:'旅游', icon:'lv_you'},
	{id:'17', name:'健康', icon:'jian_kang'},
	{id:'18', name:'医疗', icon:'yi_liao'},
	{id:'19', name:'教育', icon:'jiao_yu'},
	{id:'20', name:'珠宝', icon:'zhu_bao'},
	{id:'21', name:'轻奢', icon:'qing_she'},
	{id:'22', name:'投资', icon:'tou_zi'},
	{id:'23', name:'宠物', icon:'chong_wu'},
	{id:'24', name:'默认', icon:'default'},
];

const tagsModel = {
	iconMap,
	iconList,
	searchIcon(name: string): string {
		const item = this.iconMap.find(i => i.name === name);
		if(item) {
			return item.icon_name;
		} else {
			return 'default';
		}
	},

}

export { tagsModel };