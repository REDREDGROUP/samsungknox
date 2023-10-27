import { initCredential } from './init-credential';
import { describe, expect, it } from 'vitest';
import { ERRORS } from 'src/common';
import {
  BOTH_CREDENTIAL_DETECTED_CASE,
  CREDENTIAL_PATH_NOT_FOUND_CASE,
  CREDENTIAL_TYPE_IS_NOT_JSON_CASE,
  IDENTIFIER_IS_MISSING_CASE,
  IDENTIFIER_IS_NOT_JWT_TOKEN_CASE,
  PRIVATE_KEY_IS_MISSING_CASE,
  PUBLIC_KEY_IS_MISSING_CASE,
} from '../__test__';

describe('initCredentialFunctionTest', () => {
  it('credential args missing', async () => {
    await expect(
      initCredential({
        credential: {},
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_MISSING);
  });

  it('credential path is invalid', async () => {
    await expect(
      initCredential({
        credential: CREDENTIAL_PATH_NOT_FOUND_CASE,
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_IS_NOT_JSON_TYPE);
  });

  it('credential key is invalid', async () => {
    await expect(
      initCredential({
        credential: CREDENTIAL_TYPE_IS_NOT_JSON_CASE,
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_IS_NOT_JSON_TYPE);
  });

  it('credential key and path both input', async () => {
    await expect(
      initCredential({
        credential: BOTH_CREDENTIAL_DETECTED_CASE,
      }),
    ).rejects.toThrow(ERRORS.BOTH_CREDENTIAL_DETECTED);
  });

  it('credential key -> Public is missing', async () => {
    await expect(
      initCredential({
        credential: { key: PUBLIC_KEY_IS_MISSING_CASE },
      }),
    ).rejects.toThrow(ERRORS.PUBLIC_MISSING);
  });

  it('credential key -> Private is missing', async () => {
    await expect(
      initCredential({
        credential: { key: PRIVATE_KEY_IS_MISSING_CASE },
      }),
    ).rejects.toThrow(ERRORS.PRIVATE_MISSING);
  });

  it('credential key -> Identifier is missing', async () => {
    await expect(
      initCredential({
        credential: { key: IDENTIFIER_IS_MISSING_CASE },
      }),
    ).rejects.toThrow(ERRORS.IDENTIFIER_MISSING);
  });

  it('Identifier Jwt Token is invalid', async () => {
    await expect(initCredential(IDENTIFIER_IS_NOT_JWT_TOKEN_CASE)).rejects.toThrow(ERRORS.INVALID_JWT);
  });
});
