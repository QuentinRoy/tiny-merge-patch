# Merge Patch vectors

- RFC 7396 examples: Sections 1 and 3 and Appendix A: https://www.rfc-editor.org/rfc/rfc7396.html
- Three Section 2 cases are derived from its pseudocode: empty object patch, object patch over a non-object target, and Unicode member name.
- 29 cases are from `evanphx/json-patch` v4.13.0 `merge_test.go`, commit `84a4bb100ade42a86fce2647c95a7dbcbf569cb2`; see `LICENSE-evanphx-json-patch`.
- Test names use `<source>:<index>`; each row uses the same API call and output assertion.
