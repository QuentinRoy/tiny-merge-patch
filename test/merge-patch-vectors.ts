type MergePatchVector = {
  source: string;
  index: number;
  target: unknown;
  patch: unknown;
  expectedOutput: unknown;
};

export const mergePatchVectors: MergePatchVector[] = [
  {
    source: "rfc7396-appendix-a",
    index: 0,
    target: {
      a: "b",
    },
    patch: {
      a: "c",
    },
    expectedOutput: {
      a: "c",
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 1,
    target: {
      a: "b",
    },
    patch: {
      b: "c",
    },
    expectedOutput: {
      a: "b",
      b: "c",
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 2,
    target: {
      a: "b",
    },
    patch: {
      a: null,
    },
    expectedOutput: {},
  },
  {
    source: "rfc7396-appendix-a",
    index: 3,
    target: {
      a: "b",
      b: "c",
    },
    patch: {
      a: null,
    },
    expectedOutput: {
      b: "c",
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 4,
    target: {
      a: ["b"],
    },
    patch: {
      a: "c",
    },
    expectedOutput: {
      a: "c",
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 5,
    target: {
      a: "c",
    },
    patch: {
      a: ["b"],
    },
    expectedOutput: {
      a: ["b"],
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 6,
    target: {
      a: {
        b: "c",
      },
    },
    patch: {
      a: {
        b: "d",
        c: null,
      },
    },
    expectedOutput: {
      a: {
        b: "d",
      },
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 7,
    target: {
      a: [
        {
          b: "c",
        },
      ],
    },
    patch: {
      a: [1],
    },
    expectedOutput: {
      a: [1],
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 8,
    target: ["a", "b"],
    patch: ["c", "d"],
    expectedOutput: ["c", "d"],
  },
  {
    source: "rfc7396-appendix-a",
    index: 9,
    target: {
      a: "b",
    },
    patch: ["c"],
    expectedOutput: ["c"],
  },
  {
    source: "rfc7396-appendix-a",
    index: 10,
    target: {
      a: "foo",
    },
    patch: null,
    expectedOutput: null,
  },
  {
    source: "rfc7396-appendix-a",
    index: 11,
    target: {
      a: "foo",
    },
    patch: "bar",
    expectedOutput: "bar",
  },
  {
    source: "rfc7396-appendix-a",
    index: 12,
    target: {
      e: null,
    },
    patch: {
      a: 1,
    },
    expectedOutput: {
      e: null,
      a: 1,
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 13,
    target: [1, 2],
    patch: {
      a: "b",
      c: null,
    },
    expectedOutput: {
      a: "b",
    },
  },
  {
    source: "rfc7396-appendix-a",
    index: 14,
    target: {},
    patch: {
      a: {
        bb: {
          ccc: null,
        },
      },
    },
    expectedOutput: {
      a: {
        bb: {},
      },
    },
  },
  {
    source: "rfc7396-section-1",
    index: 0,
    target: {
      a: "b",
      c: {
        d: "e",
        f: "g",
      },
    },
    patch: {
      a: "z",
      c: {
        f: null,
      },
    },
    expectedOutput: {
      a: "z",
      c: {
        d: "e",
      },
    },
  },
  {
    source: "rfc7396-section-3",
    index: 0,
    target: {
      title: "Goodbye!",
      author: {
        givenName: "John",
        familyName: "Doe",
      },
      tags: ["example", "sample"],
      content: "This will be unchanged",
    },
    patch: {
      title: "Hello!",
      phoneNumber: "+01-123-456-7890",
      author: {
        familyName: null,
      },
      tags: ["example"],
    },
    expectedOutput: {
      title: "Hello!",
      author: {
        givenName: "John",
      },
      tags: ["example"],
      content: "This will be unchanged",
      phoneNumber: "+01-123-456-7890",
    },
  },
  {
    source: "rfc7396-section-2-derived",
    index: 0,
    target: {
      keep: 1,
      nested: {
        x: 2,
      },
    },
    patch: {},
    expectedOutput: {
      keep: 1,
      nested: {
        x: 2,
      },
    },
  },
  {
    source: "rfc7396-section-2-derived",
    index: 1,
    target: ["discard"],
    patch: {
      a: 1,
    },
    expectedOutput: {
      a: 1,
    },
  },
  {
    source: "rfc7396-section-2-derived",
    index: 2,
    target: {
      label: "old",
      雪: {
        city: "A",
      },
    },
    patch: {
      label: "new",
      雪: {
        city: "東京",
      },
    },
    expectedOutput: {
      label: "new",
      雪: {
        city: "東京",
      },
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 0,
    target: {
      title: "hello",
    },
    patch: {
      title: "goodbye",
    },
    expectedOutput: {
      title: "goodbye",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 1,
    target: {
      title: "hello",
      age: 18,
    },
    patch: {
      title: "goodbye",
    },
    expectedOutput: {
      title: "goodbye",
      age: 18,
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 2,
    target: {
      title: null,
    },
    patch: {
      title: {
        foo: "bar",
      },
    },
    expectedOutput: {
      title: {
        foo: "bar",
      },
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 3,
    target: {
      a: [
        {
          b: "c",
        },
      ],
    },
    patch: {
      a: [1],
    },
    expectedOutput: {
      a: [1],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 4,
    target: {
      a: [
        {
          b: "c",
        },
      ],
    },
    patch: {
      a: [null, 1],
    },
    expectedOutput: {
      a: [null, 1],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 5,
    target: ["a", null],
    patch: [null],
    expectedOutput: [null],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 6,
    target: ["a"],
    patch: [null],
    expectedOutput: [null],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 7,
    target: ["a", "b"],
    patch: ["a", null],
    expectedOutput: ["a", null],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 8,
    target: {
      a: ["b"],
    },
    patch: {
      a: ["b", null],
    },
    expectedOutput: {
      a: ["b", null],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 9,
    target: {
      a: [],
    },
    patch: {
      a: ["b", null, null, "a"],
    },
    expectedOutput: {
      a: ["b", null, null, "a"],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 10,
    target: {
      person: {
        title: "hello",
        age: 18,
      },
    },
    patch: {
      person: {
        title: "goodbye",
      },
    },
    expectedOutput: {
      person: {
        title: "goodbye",
        age: 18,
      },
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 11,
    target: [1],
    patch: [2],
    expectedOutput: [2],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 12,
    target: {
      a: 1,
    },
    patch: [2],
    expectedOutput: [2],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 13,
    target: [1],
    patch: {
      a: 1,
    },
    expectedOutput: {
      a: 1,
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 14,
    target: {
      a: 1,
      b: 1,
    },
    patch: {
      a: 2,
    },
    expectedOutput: {
      a: 2,
      b: 1,
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 15,
    target: {
      array: ["one", "two"],
    },
    patch: {
      array: [],
    },
    expectedOutput: {
      array: [],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 16,
    target: {
      a: "b",
    },
    patch: {
      a: "c",
    },
    expectedOutput: {
      a: "c",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 17,
    target: {
      a: "b",
    },
    patch: {
      b: "c",
    },
    expectedOutput: {
      a: "b",
      b: "c",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 18,
    target: {
      a: "b",
    },
    patch: {
      a: null,
    },
    expectedOutput: {},
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 19,
    target: {
      a: "b",
      b: "c",
    },
    patch: {
      a: null,
    },
    expectedOutput: {
      b: "c",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 20,
    target: {
      a: ["b"],
    },
    patch: {
      a: "c",
    },
    expectedOutput: {
      a: "c",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 21,
    target: {
      a: "c",
    },
    patch: {
      a: ["b"],
    },
    expectedOutput: {
      a: ["b"],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 22,
    target: {
      a: {
        b: "c",
      },
    },
    patch: {
      a: {
        b: "d",
        c: null,
      },
    },
    expectedOutput: {
      a: {
        b: "d",
      },
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 23,
    target: {
      a: [
        {
          b: "c",
        },
      ],
    },
    patch: {
      a: [1],
    },
    expectedOutput: {
      a: [1],
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 24,
    target: ["a", "b"],
    patch: ["c", "d"],
    expectedOutput: ["c", "d"],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 25,
    target: {
      a: "b",
    },
    patch: ["c"],
    expectedOutput: ["c"],
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 26,
    target: {
      e: null,
    },
    patch: {
      a: 1,
    },
    expectedOutput: {
      a: 1,
      e: null,
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 27,
    target: [1, 2],
    patch: {
      a: "b",
      c: null,
    },
    expectedOutput: {
      a: "b",
    },
  },
  {
    source: "evanphx-json-patch-v4.13.0-merge_test.go",
    index: 28,
    target: {},
    patch: {
      a: {
        bb: {
          ccc: null,
        },
      },
    },
    expectedOutput: {
      a: {
        bb: {},
      },
    },
  },
];
