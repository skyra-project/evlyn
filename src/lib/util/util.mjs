export function removeFirstAndAdd(array, value) {
	let i = 0;
	while (i < array.length)
		array[i] = array[++i];

	array[i - 1] = value;
}

export function createStatus(length) {
	const output = [];
	for (let i = 0; i < length; i++) output.push(null);
	return output;
}
