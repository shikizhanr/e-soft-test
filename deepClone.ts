export function deepClone<T>(value: T, seen = new WeakMap<object, unknown>()): T {
    if (value === null || typeof(value) !== 'object') {
        return value;
    }

    if (seen.has(value)) {
        return seen.get(value) as T;
    }

    if (value instanceof Date) {
    return new Date(value.getTime()) as T;
    }

    if (Array.isArray(value)) {
    const clone: unknown[] = [];
    seen.set(value, clone);
        for (const item of value) {
            clone.push(deepClone(item, seen));
        }
    return clone as T;
    }

    if (value instanceof Map) {
        const clone = new Map();
        seen.set(value, clone);
        for (const [k, v] of value) {
            clone.set(deepClone(k, seen), deepClone(v, seen));
        }
    return clone as T;
    }

    if (value instanceof Set) {
        const clone = new Set();
        seen.set(value, clone);
        for (const item of value) {
            clone.add(deepClone(item, seen));
        }
    return clone as T;
    }

    const clone: Record<PropertyKey, unknown> = Object.create(Object.getPrototypeOf(value));
    seen.set(value, clone);
    for (const key of Reflect.ownKeys(value)) {
        clone[key] = deepClone((value as Record<PropertyKey, unknown>)[key], seen)
    }
    return clone as T;
}