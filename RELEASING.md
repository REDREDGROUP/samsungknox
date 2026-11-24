# Releasing

This repository releases npm packages, a Ruby gem, and the documentation site
from `main`. Versions are driven by [Changesets](https://github.com/changesets/changesets).

## Normal flow

1. Add a changeset to every pull request that changes a released package:
   `pnpm changeset`.
2. After the pull request is merged, `Sync Changeset Version` opens or updates
   the `Version Packages` pull request from `changeset-release/main`.
3. Merging `Version Packages` updates each package's `CHANGELOG.md`. A changed
   `CHANGELOG.md` starts that package's publish workflow, and `Create Release`
   creates the GitHub release from `docs/releases/`.

| Package | Registry | Publish workflow |
| --- | --- | --- |
| `@redredgroup/samsungknox-api` | npm | `samsungknox-api-publish.yaml` |
| `@redredgroup/samsungknox-token-library` | npm | `samsungknox-token-publish.yaml` |
| `fastlane-plugin-samsungknox` | RubyGems | `samsungknox-fastlane-publish.yaml` |
| `@redredgroup/samsungknox-docs` | GitHub Pages | `samsungknox-docs-deploy.yaml` |

## Fastlane plugin gem

The gem version comes from
`packages/knox-fastlane-plugin/lib/fastlane/plugin/samsungknox/version.rb`, not
from the npm workspace `package.json`. Bump it in the same pull request as the
change, following semantic versioning.

`samsungknox-fastlane-publish.yaml` runs the specs and RuboCop, skips the
release when that version is already on RubyGems, and otherwise builds and
pushes the gem. It can also be started manually from the Actions tab.

The gem requires MFA (`rubygems_mfa_required`), so the workflow publishes with
[RubyGems trusted publishing](https://guides.rubygems.org/trusted-publishing/)
instead of an API key. A gem owner registers the publisher once on
RubyGems.org under the gem's **Trusted publishers** settings:

- Repository: `REDREDGROUP/samsungknox`
- Workflow: `samsungknox-fastlane-publish.yaml`
- Environment: leave empty

Register it again only when the repository or the workflow file name changes,
or when the workflow starts using a GitHub environment.

## Documentation site

`samsungknox-docs-deploy.yaml` builds `packages/knox-docs` and publishes
`packages/knox-docs/build` to the `gh-pages` branch. It runs when the docs
`CHANGELOG.md` changes and can also be started manually.
