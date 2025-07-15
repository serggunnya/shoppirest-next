import { useEffect, useState } from "react";

export function useDebouncedState<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Сброс таймера при каждом новом значении
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return [debouncedValue, setDebouncedValue] as const;
}
