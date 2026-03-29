import { describe, expectTypeOf, it } from "vitest";
import type { EmptyObject } from "../src/index.js";
import jsonMergePatch from "../src/index.js";

describe("jsonMergePatch type", () => {
  it("should replace an attribute", () => {
    const patched = jsonMergePatch({ a: "b" } as const, { a: "c" } as const);
    expectTypeOf(patched).toEqualTypeOf<{ a: "c" }>();
  });

  it("should add an attribute", () => {
    const patched = jsonMergePatch({ a: "b" } as const, { b: "c" } as const);
    expectTypeOf(patched).toEqualTypeOf<{ a: "b"; b: "c" }>();
  });

  it("should delete attribute", () => {
    let patched = jsonMergePatch({ a: "b" }, { a: null });
    expectTypeOf(patched).toEqualTypeOf<EmptyObject>();
    // @ts-expect-error
    patched = 5;
  });

  it("should delete attribute without affecting others", () => {
    const patched = jsonMergePatch({ a: "b", b: "c" } as const, { a: null });
    expectTypeOf(patched).toEqualTypeOf<{ b: "c" }>();
  });

  it("should replace array with a string", () => {
    const patched = jsonMergePatch({ a: ["b"] }, { a: "c" } as const);
    expectTypeOf(patched).toEqualTypeOf<{ a: "c" }>();
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
    const patched = jsonMergePatch({ a: [{ b: "c" }] }, { a: [1] });
    expectTypeOf(patched).toEqualTypeOf<{ a: number[] }>();
  });

  it("should replace an array", () => {
    const patched = jsonMergePatch(["a", "b"] as const, ["c", "d"] as const);
    expectTypeOf(patched).toEqualTypeOf<readonly ["c", "d"]>();
  });

  it("should replace an object with an array", () => {
    const patched = jsonMergePatch({ a: "b" }, ["c"]);
    expectTypeOf(patched).toEqualTypeOf<string[]>();
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
