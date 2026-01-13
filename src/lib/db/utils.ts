// Helper function to normalize SurrealDB results to plain objects
export function normalizeRecord(record: any): any {
	if (record === null || record === undefined) {
		return record;
	}

	// Ensure we're working with plain objects/values
	// Convert any objects to plain JavaScript objects first
	if (record && typeof record === 'object' && !(record instanceof Date) && !Array.isArray(record)) {
		// Use JSON stringify/parse to ensure it's a plain object
		try {
			const json = JSON.stringify(record);
			record = JSON.parse(json);
		} catch (e) {
			// If JSON serialization fails, continue with the original object
		}
	}

	// Handle primitive types directly
	if (typeof record === 'string' || typeof record === 'number' || typeof record === 'boolean') {
		return record;
	}

	// Handle Date objects
	if (record instanceof Date) {
		return record;
	}

	// Check if this is a SurrealDB ID object (has tb and id properties)
	if (
		typeof record === 'object' &&
		record.tb &&
		record.id &&
		typeof record.tb === 'string' &&
		typeof record.id === 'string'
	) {
		// This is a SurrealDB record ID, convert to string format "table:id"
		return `${record.tb}:${record.id}`;
	}

	// Check if this is a SurrealDB ID object (has toString method but is not a string, Date, or array)
	if (
		typeof record === 'object' &&
		record.toString &&
		typeof record.toString === 'function' &&
		typeof record !== 'string' &&
		!(record instanceof Date) &&
		!Array.isArray(record) &&
		// Additional check to make sure it's not a regular object with many properties
		Object.keys(record).length <= 2
	) {
		// This looks like a SurrealDB record ID, convert to string
		try {
			const result = record.toString();
			// Check if the result looks like a record ID (table:id format)
			if (typeof result === 'string' && result.includes(':')) {
				return result;
			}
		} catch (e) {
			// If toString fails, continue to normal object processing
		}
	}

	if (typeof record === 'object' && !Array.isArray(record)) {
		const normalized: any = {};

		for (const key in record) {
			const value = record[key];

			// Special handling for 'id' fields which are often SurrealDB record IDs
			if (key === 'id' && value && typeof value === 'object' && typeof value !== 'string') {
				if (value.tb && value.id && typeof value.tb === 'string' && typeof value.id === 'string') {
					normalized[key] = `${value.tb}:${value.id}`;
				} else if (
					value.toString &&
					typeof value.toString === 'function' &&
					!(value instanceof Date) &&
					!Array.isArray(value)
				) {
					try {
						const result = value.toString();
						if (typeof result === 'string' && result.includes(':')) {
							normalized[key] = result;
						} else {
							normalized[key] = normalizeRecord(value);
						}
					} catch (e) {
						normalized[key] = normalizeRecord(value);
					}
				} else {
					normalized[key] = normalizeRecord(value);
				}
			} else if (Array.isArray(value)) {
				// If it's an array, normalize each element
				const normalizedArray = [];
				for (const item of value) {
					// Check if array item is a SurrealDB ID object
					if (
						typeof item === 'object' &&
						item.tb &&
						item.id &&
						typeof item.tb === 'string' &&
						typeof item.id === 'string'
					) {
						normalizedArray.push(`${item.tb}:${item.id}`);
					} else if (
						typeof item === 'object' &&
						item.toString &&
						typeof item.toString === 'function' &&
						typeof item !== 'string' &&
						!(item instanceof Date) &&
						!Array.isArray(item) &&
						Object.keys(item).length <= 2
					) {
						try {
							const result = item.toString();
							if (typeof result === 'string' && result.includes(':')) {
								normalizedArray.push(result);
							} else {
								normalizedArray.push(normalizeRecord(item));
							}
						} catch (e) {
							normalizedArray.push(normalizeRecord(item));
						}
					} else {
						normalizedArray.push(normalizeRecord(item));
					}
				}
				normalized[key] = normalizedArray;
			} else {
				// Check if the value is a SurrealDB ID object
				if (
					typeof value === 'object' &&
					value.tb &&
					value.id &&
					typeof value.tb === 'string' &&
					typeof value.id === 'string'
				) {
					normalized[key] = `${value.tb}:${value.id}`;
				} else if (
					typeof value === 'object' &&
					value.toString &&
					typeof value.toString === 'function' &&
					typeof value !== 'string' &&
					!(value instanceof Date) &&
					!Array.isArray(value) &&
					Object.keys(value).length <= 2
				) {
					try {
						const result = value.toString();
						if (typeof result === 'string' && result.includes(':')) {
							normalized[key] = result;
						} else {
							normalized[key] = normalizeRecord(value);
						}
					} catch (e) {
						normalized[key] = normalizeRecord(value);
					}
				} else {
					// Recursively normalize nested objects
					normalized[key] = normalizeRecord(value);
				}
			}
		}

		return normalized;
	}

	// For arrays, normalize each element
	if (Array.isArray(record)) {
		return record.map((item) => normalizeRecord(item));
	}

	// Return as-is for other types
	return record;
}
