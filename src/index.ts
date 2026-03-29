/**
 * Test if a value is a plain object.
 */
const isObject = (val: unknown): val is Record<string, unknown> =>
  val != null && typeof val === "object" && Array.isArray(val) === false;

/**
 * Extract keys from a patch object where the value is null (properties to remove).
 */
type NullKeys<T> = {
  [K in keyof T]: T[K] extends null ? K : never;
}[keyof T];

type IsPlainObject<T> = T extends readonly unknown[]
  ? false
  : T extends Record<PropertyKey, unknown>
    ? true
    : false;

declare const emptyObjectSymbol: unique symbol;
export interface EmptyObject {
  [emptyObjectSymbol]?: never;
}

type NormalizeEmptyObject<T extends object> = keyof T extends never ? EmptyObject : T;

type Patched<Origin, Patch> =
  IsPlainObject<Patch> extends true
    ? IsPlainObject<Origin> extends true
      ? NormalizeEmptyObject<{
          [K in Exclude<keyof Origin | keyof Patch, NullKeys<Patch>>]: K extends keyof Patch
            ? K extends keyof Origin
              ? Patched<Origin[K], Patch[K]>
              : Patched<unknown, Patch[K]>
            : K extends keyof Origin
              ? Origin[K]
              : never;
        }>
      : NormalizeEmptyObject<{
          [K in Exclude<keyof Patch, NullKeys<Patch>>]: Patched<unknown, Patch[K]>;
        }>
    : Patch;

/**
 * Apply a JSON merge patch. The origin is not modified, but unchanged
 * properties are recycled.
 */
export function apply<Origin, Patch>(origin: Origin, patch: Patch): Patched<Origin, Patch> {
  if (!isObject(patch)) {
    // If the patch is not an object, it replaces the origin.
    return patch as Patched<Origin, Patch>;
  }

  const result: Record<string, unknown> = !isObject(origin) ? {} : { ...origin };

  for (const [key, patchVal] of Object.entries(patch)) {
    if (patchVal === null) {
      delete result[key];
    } else {
      result[key] = apply(result[key], patchVal);
    }
  }

  return result as Patched<Origin, Patch>;
}

export default apply;
