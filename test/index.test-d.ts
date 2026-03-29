import { describe, expectTypeOf, it } from "vitest";
import type { EmptyObject } from "../src/index.js";
import jsonMergePatch from "../src/index.js";

describe("jsonMergePatch type", () => {
  it("should replace an attribute", () => {
    const patched = jsonMergePatch({ a: "b" }, { a: "c" });
    expectTypeOf(patched).toEqualTypeOf<{ a: string }>();
  });

  it("should add an attribute", () => {
    const patched = jsonMergePatch({ a: "b" }, { b: "c" });
    expectTypeOf(patched).toEqualTypeOf<{ a: string; b: string }>();
  });

  it("should delete attribute", () => {
    let patched = jsonMergePatch({ a: "b" }, { a: null });
    expectTypeOf(patched).toEqualTypeOf<EmptyObject>();
    // @ts-expect-error
    patched = 5;
  });

  it("should delete attribute without affecting others", () => {
    const patched = jsonMergePatch({ a: "b", b: "c" }, { a: null });
    expectTypeOf(patched).toEqualTypeOf<{ b: string }>();
  });

  it("should replace array with a string", () => {
    const patched = jsonMergePatch({ a: ["b"] }, { a: "c" });
    expectTypeOf(patched).toEqualTypeOf<{ a: string }>();
  });

  it("should replace a string with an array", () => {
    const patched = jsonMergePatch({ a: "c" }, { a: ["b"] });
    expectTypeOf(patched).toEqualTypeOf<{ a: string[] }>();
  });

  it("should apply recursively", () => {
    const patched = jsonMergePatch({ a: { b: "c" } }, { a: { b: "d", c: null } });
    expectTypeOf(patched).toEqualTypeOf<{ a: { b: string } }>();
  });

  it("should replace an object array with a number array", () => {
    const patched = jsonMergePatch({ a: [{ b: "c" }] }, { a: [1] as const });
    expectTypeOf(patched).toEqualTypeOf<{ a: readonly [1] }>();
  });

  it("should replace an array", () => {
    const patched = jsonMergePatch(["a", "b"] as const, ["c", "d"] as const);
    expectTypeOf(patched).toEqualTypeOf<readonly ["c", "d"]>();
  });

  it("should replace an object with an array", () => {
    const patched = jsonMergePatch({ a: "b" }, ["c"] as const);
    expectTypeOf(patched).toEqualTypeOf<readonly ["c"]>();
  });

  it("should replace an object with null", () => {
    const patched = jsonMergePatch({ a: "foo" }, null);
    expectTypeOf(patched).toEqualTypeOf<null>();
  });

  it("should replace an object with a string", () => {
    const patched = jsonMergePatch({ a: "foo" }, "bar");
    expectTypeOf(patched).toEqualTypeOf<string>();
  });

  it("should not change null attributes", () => {
    const patched = jsonMergePatch({ e: null }, { a: 1 });
    expectTypeOf(patched).toEqualTypeOf<{ e: null; a: number }>();
  });

  it("should not set an attribute to null", () => {
    const patched = jsonMergePatch([1, 2], { a: "b", c: null });
    expectTypeOf(patched).toEqualTypeOf<{ a: string }>();
  });

  it("should not set an attribute to null in a sub object", () => {
    const patched = jsonMergePatch({}, { a: { bb: { ccc: null } } });
    expectTypeOf(patched).toEqualTypeOf<{ a: { bb: EmptyObject } }>();
  });
});
