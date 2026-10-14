# Samsung Knox SDK

This monorepo provides a TypeScript client for Samsung Knox Configure, OAuth
token utilities, and a Fastlane plugin for uploading in-house applications.

## Current Configure API

For new integrations, use the explicitly versioned OAuth Configure v2 client.
Start with the [migration guide](packages/knox-docs/docs/knox-api/migration-v2.mdx).
The client sends a global API request with an OAuth Bearer access token. Your
application owns token issuance, storage, expiry, and renewal.

The current API reference is labeled **26.10 UAT**. Its production rollout and
authentication against a real tenant have not been verified by this project.

## Packages

- `@redredgroup/samsungknox-api`: Configure v2 client and retained legacy API.
- `@redredgroup/samsungknox-token-library`: OAuth access-token requests and
  retained v1 JWT helpers.
- `fastlane-plugin-samsungknox`: OAuth-default in-house APK upload with an
  explicit legacy authentication mode.

## Compatibility

Existing root exports, `KnoxInstance`, and old operation examples describe the
legacy API surface. They are not aliases for Configure v2 and do not fall back
to v2. Trial license generation, validation, Galaxy Store upload, and
per-version deletion have no supported v2 equivalent in this SDK and remain
legacy-only.

## License

Apache-2.0. REDREDGROUP is not affiliated with Samsung Knox.
