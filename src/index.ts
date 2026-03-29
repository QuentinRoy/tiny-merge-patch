/**
 * Test if a value is a plain object.
 */
const isObject = (val: unknown): val is Record<string, unknown> =>
  val != null && typeof val === "object" && Array.isArray(val) === false;

/**
 * Apply a JSON merge patch. The origin is not modified, but unchanged
 * properties are recycled.
 */
export function apply(origin: unknown, patch: unknown): unknown {
  if (!isObject(patch)) {
    // If the patch is not an object, it replaces the origin.
    return patch;
  }

  const result: Record<string, unknown> = !isObject(origin) ? {} : { ...origin };

  for (const key of Object.keys(patch)) {
    const patchVal = patch[key];
    if (patchVal === null) {
      delete result[key];
    } else {
      result[key] = apply(result[key], patchVal);
    }
  }

  return result;
}

export default apply;
