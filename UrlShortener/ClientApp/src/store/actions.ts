import { ShortenUrl, ShortenUrlResult } from "./shortenUrl";
import { AppThunkAction } from ".";
import { addUrl } from "./api";

interface SavePendingUrlAction {
    type: 'PENDING_URL_SHORTENER'
}

interface SaveErrorUrlAction {
    type: 'ERROR_URL_SHORTENER',
    errors: string[]
}

interface SaveSuccessUrlAction {
    type: 'SUCCESS_URL_SHORTENER',
    url: ShortenUrl
}

interface ExistingUrlAction {
    type: 'EXISTING_URL_SHORTENER',
    url: ShortenUrl
}

interface ClearAction {
    type: 'CLEAR_URL_SHORTENER',
}

export type KnownAction = SavePendingUrlAction | SaveErrorUrlAction | SaveSuccessUrlAction | ExistingUrlAction | ClearAction;

export const actionCreators = {
    saveShortenUrl: (urlToSave: ShortenUrl): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.shortenUrl) {
            addUrl(urlToSave)
                .then(res => {
                    if (res.ok && res.data as ShortenUrlResult) {
                        const savedUrl = res.data as ShortenUrlResult
                        if (savedUrl.isNew) {
                            dispatch({ type: 'SUCCESS_URL_SHORTENER', url: savedUrl });
                        }
                        else {
                            dispatch({ type: 'EXISTING_URL_SHORTENER', url: savedUrl });
                        }
                    } else {
                        dispatch({ type: 'ERROR_URL_SHORTENER', errors: res.errors });
                    }
                });

            dispatch({ type: 'PENDING_URL_SHORTENER' });
        }
    },
    clear: (): AppThunkAction<ClearAction> => (dispatch, getState) => {
        console.log('clear');
        dispatch({ type: 'CLEAR_URL_SHORTENER' });
    }
};

