export function removeFirstAndAdd(array, value) {
	let i = 0;
	while (i < array.length)
		array[i] = array[++i];

	array[i - 1] = value;
}
