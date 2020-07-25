import { AxiosResponse, AxiosError } from 'axios';

export interface IApiResult {
    ok: boolean,
    message?: string,
    errors: any[],
    data?: any,
}

export const handleApiSuccess = (response: AxiosResponse): IApiResult => {
    return {
        ok: true,
        data: response.data,
        errors: [],
    }
}

export const handleApiError = <T>(err: AxiosError): IApiResult => {
    if (err.response
        && err.response.status === 400
        && err.response.data
        && err.response.data.errors) {
        const data = err.response.data.errors;
        const result: IApiResult = {
            ok: false,
            errors: []
        };

        console.log(data);
        // Convert errors array to string for the result
        if (typeof data != 'string') {
            for (let prop in data) {
                result.errors.push(data[prop].toString());
            }
        } else {
            result.message = String(data);
        }
        return result;
    } else {
        console.log(err);
        throw err;
    }
};
