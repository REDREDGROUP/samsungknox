# `@redredgroup/samsungknox-token-library`

Use `v2.requestOAuthAccessToken` to request an OAuth 2.0 client-credentials
token for Knox Configure. See the [OAuth migration guide](https://github.com/REDREDGROUP/samsungknox/blob/main/packages/knox-docs/docs/knox-token-library/oauth-v2.mdx).
The preserved JWT-signing surface is available through `v1` and the default
export's `v1` property; these remain legacy APIs.

The helper returns the access token, expiry in seconds, granted scope, and
token type. It does not cache, store, or renew tokens. Your application owns
expiry and renewal.

The Configure API reference is labeled **26.10 UAT**. Production rollout and
authentication against an actual Samsung tenant are unverified.

## License

Apache-2.0. REDREDGROUP is not affiliated with Samsung Knox.
