declare	type RecordData = {
	tag: string
	note: string
	type: string
	sum: number
	createdAt?: Date  //类
}

declare type Tag = {
	id: string
	name: string
}

declare type tagsModel = {
	data: Tag[]
	fetch: () => Tag[]
	create: (name: string) => 'success' | 'duplicated' | 'empty'
	save: () => void
}
