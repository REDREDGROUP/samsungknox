module ErrorMessage
  INVALID_JWT = 'clientIdentifierJwtToken is not a json web token type. check your clientIdentifierJwtToken'
  BOTH_CREDENTIAL_DETECTED = "credentials exceeded one. You must specify either key or path." 
  CREDENTIAL_IS_NOT_JSON_TYPE = "credential is not json type. Please check the credential file or path"
  CREDENTIAL_MISSING = "credential is missing. Please check the credential file or path"
  CREDENTIAL_FILE_NOT_FOUND = "credential read failed. Please check the credential path"
  IDENTIFIER_MISSING = 'credential -> identifier is missing. Please check the credential file or path.'
  PRIVATE_MISSING = 'credential -> Private is missing. Please check the credential file or path.'
  PUBLIC_MISSING = 'credential -> Public is missing. Please check the credential file or path.'


  def self.aab_upload_error(aab_state)
    "Failed to process the AAB: #{aab_state}"
  end

  def self.binary_not_found(binary_type)
    "Could not find the #{binary_type}. Make sure you set the #{binary_type} path parameter to point to your #{binary_type}"
  end

  def self.parse_binary_metadata_error(binary_type)
    "Failed to extract #{binary_type} metadata from the #{binary_type} path"
  end

  def self.upload_binary_error(binary_type)
    "App Distribution halted because it had a problem uploading the #{binary_type}"
  end

  def self.binary_processing_error(binary_type)
    "App Distribution failed to process the #{binary_type}"
  end
end
