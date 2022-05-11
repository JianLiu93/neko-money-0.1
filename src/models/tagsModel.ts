const keyName = 'tagList';
const tagBasic: Tag[] = [
	{id: '美食', name:'美食'}, 
	{id: '住宿', name:'住宿'}, 
	{id: '出行', name:'出行'}, 
	{id: '衣妆', name:'衣妆'}, 
	{id: '娱乐', name:'娱乐'}
]

const tagsModel: tagsModel = {
	data: [],
	fetch() {
		this.data = JSON.parse(window.localStorage.getItem(keyName) || '[]');
		if(this.data.length === 0) {this.data = tagBasic}
		return this.data;
	},
	save() {
		window.localStorage.setItem(keyName, JSON.stringify(this.data));
	},
	create(name) {
		const dataNames = this.data.map((item) => item.name);
	// 成功和失败有返回值，失败返回原因，1重复
		if(name === '') {
			return 'empty';
		} else if(dataNames.indexOf(name) >= 0) {
			return 'duplicated';
		}
		this.data.push({id: name, name: name});
		this.save();
		return 'success';
	},
	update(id, name) {
		const idList = this.data.map((item) => item.id);
		if(idList.indexOf(id) >= 0) {
			const names = this.data.map((item) => item.name);
			if(names.indexOf(name) >= 0) {
				return 'duplicated';
			} else {
				const tag = this.data.filter((item) => item.id === id)[0];
				tag.name = name;
				this.save();
				return 'success';
			}
		} else {
			return 'not found';
		}
	},
	remove(id: string) {
		let index = -1;
		for(let i=0; i<this.data.length; i++) {
			if(this.data[i].id ===id) {
			index = i;
			break;
			}
		}
		this.data.splice(index,1);
		this.save();
	}
}

export { tagsModel };