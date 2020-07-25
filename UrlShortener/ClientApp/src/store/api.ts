import axios from 'axios';
import { ShortenUrl } from './shortenUrl';
import { handleApiSuccess, handleApiError, IApiResult } from '../shared/api';

export const addUrl = (urlToSave: ShortenUrl): Promise<IApiResult> => {
    return axios.put(`ShortenUrl`, urlToSave)
        .then(handleApiSuccess)
        .catch(handleApiError);
}