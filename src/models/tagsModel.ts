const keyName = 'tagList';
const tagBasic: string[] = ['美食', '住宿', '出行', '衣妆', '娱乐'];

type tagsModel = {
	data: string[]
	fetch: () => string[]
	create: (name: string) => 'success' | 'duplicated' | 'empty'
	save: () => void
}

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
	// 成功和失败有返回值，失败返回原因，1重复
		if(name === '') {
			return 'empty';
		} else if(this.data.indexOf(name) >= 0) {
			return 'duplicated';
		}
		
		this.data.push(name);
		this.save();
		return 'success';
	}
}

export { tagsModel };