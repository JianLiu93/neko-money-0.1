declare	type RecordData = {
	tag: string
	note: string
	type: string
	sum: number
	createdAt?: string
}

type Tag = {
	id: string
	name: string
}
type tagsModel = {
	data: Tag[]
	fetch: () => Tag[]
	save: () => void
	create: (name: string) => 'success' | 'duplicated' | 'empty'
	update: (id: string, name: string) => 'success' | 'duplicated' | 'not found'
	remove: (id: string) => void
}

interface Window {
	tagData: Tag[]
	recordData: RecordData[]
}
