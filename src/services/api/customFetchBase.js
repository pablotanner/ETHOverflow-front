import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { Mutex } from 'async-mutex';

const mutex = new Mutex();



/*

This is totally unnecessary since we dont work with access tokens but too lazy to remove it since might break something
 */

// eslint-disable-next-line no-undef
const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
        const accessToken = getState().authSlice?.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
})

const customFetchBase = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 401 || result.error.status === 403) ) {
        if(!mutex.isLocked()){
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery({url: '/refresh', method: "POST", body: {
                        refreshToken: localStorage.getItem('refreshToken'),}}, api, extraOptions);

                if (refreshResult?.data) {

                    // Retry the initial request
                    result = await baseQuery(args, api, extraOptions);
                }
                else {
                    logoutUser();
                    // Add toastify notification here
                }
            }
            finally {
                release();
            }
        }
        else {
            // Wait for mutex to be available
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
}


export default customFetchBase;