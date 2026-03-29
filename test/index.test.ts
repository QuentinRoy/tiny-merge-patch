import { describe, expect, it } from "vitest";
import jsonMergePatch from "../src";

describe("jsonMergePatch", () => {
  it("should replace an attribute", () => {
    expect(jsonMergePatch({ a: "b" }, { a: "c" })).toEqual({ a: "c" });
  });

  it("should add an attribute", () => {
    expect(jsonMergePatch({ a: "b" }, { b: "c" })).toEqual({
      a: "b",
      b: "c",
    });
  });

  it("should delete attribute", () => {
    expect(jsonMergePatch({ a: "b" }, { a: null })).toEqual({});
  });

  it("should delete attribute without affecting others", () => {
    expect(jsonMergePatch({ a: "b", b: "c" }, { a: null })).toEqual({
      b: "c",
    });
  });

  it("should replace array with a string", () => {
    expect(jsonMergePatch({ a: ["b"] }, { a: "c" })).toEqual({ a: "c" });
  });

  it("should replace a string with an array", () => {
    expect(jsonMergePatch({ a: "c" }, { a: ["b"] })).toEqual({ a: ["b"] });
  });

  it("should apply recursively", () => {
    expect(jsonMergePatch({ a: { b: "c" } }, { a: { b: "d", c: null } })).toEqual({
      a: { b: "d" },
    });
  });

  it("should replace an object array with a number array", () => {
    expect(jsonMergePatch({ a: [{ b: "c" }] }, { a: [1] })).toEqual({
      a: [1],
    });
  });

  it("should replace an array", () => {
    expect(jsonMergePatch(["a", "b"], ["c", "d"])).toEqual(["c", "d"]);
  });

  it("should replace an object with an array", () => {
    expect(jsonMergePatch({ a: "b" }, ["c"])).toEqual(["c"]);
  });

  it("should replace an object with null", () => {
    expect(jsonMergePatch({ a: "foo" }, null)).toBeNull();
  });

  it("should replace an object with a string", () => {
    expect(jsonMergePatch({ a: "foo" }, "bar")).toBe("bar");
  });

  it("should not change null attributes", () => {
    expect(jsonMergePatch({ e: null }, { a: 1 })).toEqual({ e: null, a: 1 });
  });

  it("should not set an attribute to null", () => {
    expect(jsonMergePatch([1, 2], { a: "b", c: null })).toEqual({ a: "b" });
  });

  it("should not set an attribute to null in a sub object", () => {
    expect(jsonMergePatch({}, { a: { bb: { ccc: null } } })).toEqual({
      a: { bb: {} },
    });
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
