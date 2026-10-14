# `fastlane-plugin-samsungknox`

The `knox_configure_library_upload_app` action uses OAuth by default. Provide
`client_id`, `client_secret`, and an existing readable APK path. Token expiry
and renewal are not handled by the action. The OAuth flow never falls back to
legacy credentials.

To deliberately use the retained regional JWT flow, set `auth_mode: 'legacy'`
and supply its legacy options. See the [plugin OAuth guide](../knox-docs/docs/knox-fastlane-plugin/oauth-v2.mdx)
for both configurations, upload status meanings, and evidence limits.

The current Configure reference is labeled **26.10 UAT**. Production rollout
and authentication against an actual Samsung tenant are unverified.

## License

Apache-2.0. REDREDGROUP is not affiliated with Samsung Knox.
