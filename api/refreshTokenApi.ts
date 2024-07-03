import axios, {AxiosResponse} from 'axios';
import {ResponseTokenProps} from '@/types/auth.types';

const baseURL = 'https://ftravelapi.azurewebsites.net';
const requestRefreshToken = (
  jwtToken: string,
): Promise<AxiosResponse<ResponseTokenProps>> => {
  return axios.post<ResponseTokenProps>(
    `${baseURL}/api/authen/refresh-token`,
    jwtToken,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export default requestRefreshToken;
