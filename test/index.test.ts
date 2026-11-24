import { describe, expect, it } from "vitest";
import jsonMergePatch from "../src/index.js";
import { mergePatchVectors } from "./merge-patch-vectors.js";

describe("jsonMergePatch", () => {
  it.each(mergePatchVectors)("should match $source:$index", ({ target, patch, expectedOutput }) => {
    const before = structuredClone(target);
    expect(jsonMergePatch(target, patch)).toEqual(expectedOutput);
    expect(target).toEqual(before);
  });

  it("should not directly edit the origin", () => {
    const origin = { a: { b: 10 }, c: 5 };
    const clone = structuredClone(origin);
    const patched = jsonMergePatch(origin, { a: { b: 8 } }) as typeof origin;

    expect(patched).not.toBe(origin);
    expect(patched.a).not.toBe(origin.a);
    expect(origin).toEqual(clone);
  });

  it("should recycle properties if possible", () => {
    const origin = { a: { b: 10 }, c: 5 };
    const patched = jsonMergePatch(origin, { c: 8 }) as typeof origin;

    expect(patched.a).toBe(origin.a);
  });
});
