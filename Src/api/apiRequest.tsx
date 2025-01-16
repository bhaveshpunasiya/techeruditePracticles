import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {urls} from './urls';

const axiosClient = axios.create({
  baseURL: urls.baseURL,
});

const request = async (
  axiosConfig: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return axiosClient.request(axiosConfig);
};

export default request;
