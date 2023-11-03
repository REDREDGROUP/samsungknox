import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseKCLicense } from '~/types';
import { KCRegisterLicenseArgs } from './register-license.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcRegisterLicense = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCRegisterLicenseArgs>>>,
): Promise<BaseResponse<BaseKCLicense>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.post<BaseKCLicense>('/kcs/v1/kc/licenses', args, {
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: data.statusMessage,
      result: {
        licenses: data.licenses,
        totalCount: data.totalCount,
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    } else {
      throw new Error(error);
    }
  }
};
