type Tag = {
	id: string
	name: string
}

type tagsModel = {
	data: Tag[]
	fetch: () => Tag[]
	create: (name: string) => 'success' | 'duplicated' | 'empty'
	save: () => void
}

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
	}
}

export { tagsModel };