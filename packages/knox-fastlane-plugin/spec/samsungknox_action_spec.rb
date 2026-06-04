describe Fastlane::Actions::KnoxConfigureLibraryUploadAppAction do
  describe '.description' do
    it 'describes the Knox Configure Library upload action' do
      expect(described_class.description).to eq('fastlane plugin for Samsung Knox Configure Library')
    end
  end

  describe '.is_supported?' do
    it 'supports Android' do
      expect(described_class.is_supported?(:android)).to be(true)
    end

    it 'does not support iOS' do
      expect(described_class.is_supported?(:ios)).to be(false)
    end
  end
end
