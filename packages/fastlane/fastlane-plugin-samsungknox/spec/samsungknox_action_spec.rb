describe Fastlane::Actions::SamsungknoxAction do
  describe '#run' do
    it 'prints a message' do
      expect(Fastlane::UI).to receive(:message).with("The samsungknox plugin is working!")

      Fastlane::Actions::SamsungknoxAction.run(nil)
    end
  end
end
