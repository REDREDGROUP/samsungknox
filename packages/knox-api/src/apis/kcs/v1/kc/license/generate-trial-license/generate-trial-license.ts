import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { BaseXApiRequireType, BaseApiRequireArgsType, BaseArgsInputType, BaseResponseType } from '~/types';
import { GenerateKnoxConfigureTrialLicenseArgsType, GenerateKnoxConfigureTrialLicenseResponseType } from './generate-trial-license.type';

export const getKnoxConfigureGenerateTrialLicense = async (
  value: BaseXApiRequireType<BaseApiRequireArgsType<BaseArgsInputType<GenerateKnoxConfigureTrialLicenseArgsType>>>,
): Promise<BaseResponseType<GenerateKnoxConfigureTrialLicenseResponseType>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.post<GenerateKnoxConfigureTrialLicenseResponseType>('/kcs/v1/kc/licenses/trial', {
      params: args,
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
