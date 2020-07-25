import { Reducer, Action } from 'redux';
import { KnownAction } from './actions';
import { Status, ShortenUrl } from './shortenUrl';

export interface ShortenUrlState {
    current: ShortenUrl;
    status: Status;
    errors: string[];
}

const initialState = {
    status: Status.Iddle,
    current: { url: "", alias: "" },
    errors: []
}

export const reducer: Reducer<ShortenUrlState> = (state: ShortenUrlState | undefined, incomingAction: Action): ShortenUrlState => {
    if (state === undefined) {
        return initialState;
    }
    
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SUCCESS_URL_SHORTENER':
            return {
                current: action.url,
                status: Status.Success,
                errors: []
            };
        case 'EXISTING_URL_SHORTENER':
            return {
                current: action.url,
                status: Status.Existing,
                errors: []
            }
        case 'PENDING_URL_SHORTENER':
            return {
                ...state,
                status: Status.Pending
            };
        case 'ERROR_URL_SHORTENER':
            return {
                ...state,
                status: Status.Error,
                errors: action.errors
            };
        case 'CLEAR_URL_SHORTENER':
            return {
                current: { url: "", alias: "" },
                status: Status.Iddle,
                errors: [],
            };
        default:
            return state;
    }
}