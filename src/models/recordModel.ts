// const storageKeyName = 'recordList';
// const model = {
// 	fetch(): RecordData[] {
// 		return JSON.parse(window.localStorage.getItem(storageKeyName) || '[]') as RecordData[];
// 	},
// 	save(data: RecordData[]): void {
// 		window.localStorage.setItem(storageKeyName, JSON.stringify(data));
// 	},
// 	clone(data: RecordData | RecordData[]): any {
// 		return JSON.parse(JSON.stringify(data));
// 	}
// }

const recordModel = {
	data: [] as RecordData[],
	fetch(): RecordData[] {
		this.data =  JSON.parse(window.localStorage.getItem('recordList') || '[]');
		return this.data;
	},
	save(): void {
		window.localStorage.setItem('recordList', JSON.stringify(this.data));
	},
	clone(data: RecordData | RecordData[]): any {
		return JSON.parse(JSON.stringify(data));
	},
	create(record: RecordData): void {
		const copyRecord: RecordData = this.clone(record);
		copyRecord.createdAt = new Date();
		this.data.push(copyRecord);
		this.save();
	}
}

export { recordModel };