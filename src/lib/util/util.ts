export function removeFirstAndAdd<T>(array: Array<T>, value: T): Array<T> {
	let i = 0;
	while (i < array.length)
		array[i] = array[++i];

	array[i - 1] = value;
	return array;
}

export function createArray<T>(length: number, fill: (index: number, array: Array<T>) => T = () => null): Array<T | null> {
	const output = [];
	for (let i = 0; i < length; i++) output.push(fill(i, output));
	return output;
}
