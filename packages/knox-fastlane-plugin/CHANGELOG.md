# @redredgroup/knox-fastlane-plugin

## 1.0.0

### Major Changes

- fec63b6: Add an explicitly versioned Configure v2 OAuth SDK and OAuth token helper.
  Existing root API and JWT exports remain available as legacy contracts. The
  Fastlane plugin now defaults to OAuth for in-house APK upload, with regional
  JWT behavior available only through explicit legacy mode. Token expiry and
  renewal remain caller-owned. This OAuth-default behavior is a breaking change
  for the separately released Ruby gem. The npm workspace entries version the
  API, token library, and Fastlane plugin only; they do not version the Ruby gem.
  It follows its separate gem version and release path, with no manual version
  bump here.

## 0.1.1

### Patch Changes

- If there are duplicate packages in the upload, skip the upload rather than raise an error.
