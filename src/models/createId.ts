let id: number = parseInt(window.localStorage.getItem('_idStart') || '6');

function createId(): number {
	id++;
	window.localStorage.setItem('_idStart', id.toString());
	return id;
}

export default createId;