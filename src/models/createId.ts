let id: number = parseInt(window.localStorage.getItem('_idStart') || '5');

function createId(): number {
	id++;
	return id;
}

export default createId;