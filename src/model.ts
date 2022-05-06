const storageKeyName = 'recordList';
const model = {
	fetch(): RecordData[] {
		return JSON.parse(window.localStorage.getItem(storageKeyName) || '[]') as RecordData[];
	},
	save(data: RecordData[]): void {
		window.localStorage.setItem(storageKeyName, JSON.stringify(data));
	},
	clone(data: RecordData | RecordData[]): any {
		return JSON.parse(JSON.stringify(data));
	}
}
export {model};