# `@redredgroup/samsungknox-api`

Configure v2 is the recommended API for new integrations. The existing root
exports, including `KnoxInstance` and the old endpoint functions, are legacy
APIs. They keep their existing contract and do not transparently adapt to v2.

See the [Configure v2 migration guide](https://github.com/REDREDGROUP/samsungknox/blob/main/packages/knox-docs/docs/knox-api/migration-v2.mdx)
for OAuth setup, scopes, client examples, method shapes, and legacy-only
operations.

The client uses `https://api.samsungknox.com` by default and sends
`Authorization: Bearer <accessToken>`. The caller obtains and renews the token.
The optional `managedTenantId` sets `x-wsm-managed-tenantid`; `baseURL` and
`timeout` can be overridden.

The official reference used here is labeled **26.10 UAT**. Production rollout
and authentication against an actual Samsung tenant are unverified.

## License

Apache-2.0
