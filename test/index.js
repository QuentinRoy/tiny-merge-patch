import test from 'ava';
import { cloneDeep } from 'lodash';
import jsonMergePatch from '../esm';

test('`jsonMergePatch` should replace an attribute', t => {
  t.deepEqual(jsonMergePatch({ a: 'b' }, { a: 'c' }), { a: 'c' });
});

test('`jsonMergePatch` should add an attribute', t => {
  t.deepEqual(jsonMergePatch({ a: 'b' }, { b: 'c' }), {
    a: 'b',
    b: 'c',
  });
});

test('`jsonMergePatch` should delete attribute', t => {
  t.deepEqual(jsonMergePatch({ a: 'b' }, { a: null }), {});
});

test('`jsonMergePatch` should delete attribute without affecting others', t => {
  t.deepEqual(jsonMergePatch({ a: 'b', b: 'c' }, { a: null }), {
    b: 'c',
  });
});

test('`jsonMergePatch` should replace array with a string', t => {
  t.deepEqual(jsonMergePatch({ a: ['b'] }, { a: 'c' }), { a: 'c' });
});

test('`jsonMergePatch` should replace an string with an array', t => {
  t.deepEqual(jsonMergePatch({ a: 'c' }, { a: ['b'] }), { a: ['b'] });
});

test('`jsonMergePatch` should apply recursively', t => {
  t.deepEqual(jsonMergePatch({ a: { b: 'c' } }, { a: { b: 'd', c: null } }), {
    a: { b: 'd' },
  });
});

test('`jsonMergePatch` should replace an object array with a number array', t => {
  t.deepEqual(jsonMergePatch({ a: [{ b: 'c' }] }, { a: [1] }), {
    a: [1],
  });
});

test('`jsonMergePatch` should replace an array', t => {
  t.deepEqual(jsonMergePatch(['a', 'b'], ['c', 'd']), ['c', 'd']);
});

test('`jsonMergePatch` should replace an object with an array', t => {
  t.deepEqual(jsonMergePatch({ a: 'b' }, ['c']), ['c']);
});

test('`jsonMergePatch` should replace an object with null', t => {
  t.deepEqual(jsonMergePatch({ a: 'foo' }, null), null);
});

test('`jsonMergePatch` should replace an object with a string', t => {
  t.deepEqual(jsonMergePatch({ a: 'foo' }, 'bar'), 'bar');
});

test('`jsonMergePatch` should not change null attributes', t => {
  t.deepEqual(jsonMergePatch({ e: null }, { a: 1 }), { e: null, a: 1 });
});

test('`jsonMergePatch` should not set an attribute to null', t => {
  t.deepEqual(jsonMergePatch([1, 2], { a: 'b', c: null }), { a: 'b' });
});

test('`jsonMergePatch` should not set an attribute to null in a sub object', t => {
  t.deepEqual(jsonMergePatch({}, { a: { bb: { ccc: null } } }), {
    a: { bb: {} },
  });
});

test('`jsonMergePatch` should not directly edit the origin', t => {
  const origin = { a: { b: 10 }, c: 5 };
  const clone = cloneDeep(origin);
  const patched = jsonMergePatch(origin, { a: { b: 8 } }, origin);
  t.not(patched, origin);
  t.not(patched.a, origin.a);
  t.deepEqual(origin, clone);
});

test('`jsonMergePatch` should recycle properties if possible', t => {
  const origin = { a: { b: 10 }, c: 5 };
  const patched = jsonMergePatch(origin, { c: 8 }, origin);
  t.is(patched.a, origin.a);
});
