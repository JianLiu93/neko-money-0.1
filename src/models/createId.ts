let id: number = parseInt(window.localStorage.getItem('_idStart') || '5');

function createId(): number {
	id++;
	window.localStorage.setItem('_idStart', id.toString());
	return id;
}

export default createId;