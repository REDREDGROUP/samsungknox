lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fastlane/plugin/samsungknox/version'

Gem::Specification.new do |spec|
  spec.name          = 'fastlane-plugin-samsungknox'
  spec.version       = Fastlane::Samsungknox::VERSION
  spec.author        = 'jieey1140'
  spec.email         = 'seihoonkim@redredgroup.com'

  spec.summary       = 'SamsungKnox products to Fastlane https://redredgroup.github.io/samsungknox/docs/knox-fastlane'
  spec.homepage      = "https://github.com/REDREDGROUP/samsungknox"
  spec.license       = "Apache-2.0"

  spec.files         = Dir["lib/**/*"] + %w(README.md LICENSE)
  spec.require_paths = ['lib']
  spec.metadata['rubygems_mfa_required'] = 'true'
  spec.required_ruby_version = '>= 2.6'

  spec.add_development_dependency('bundler')
  spec.add_development_dependency('fastlane', '>= 2.217.0')
  spec.add_development_dependency('pry')
  spec.add_development_dependency('rake')
  spec.add_development_dependency('rspec')
  spec.add_development_dependency('rspec_junit_formatter')
  spec.add_development_dependency('rubocop', '1.50.2')
  spec.add_development_dependency('rubocop-performance')
  spec.add_development_dependency('rubocop-require_tools')
  spec.add_development_dependency('simplecov')
end
