export type ApiClientConfig = {
    apiKey: string
    apiHost: string
};

/**
 * Configuration object for the Client SDK.
 * Contains the API key and optionally the API host for requests.
 *
 * @property apiKey - The API key used for authenticating SDK requests.
 * @property apiHost - (Optional) The host URL of the server.
 */
export type ClientSDKConfig = {
    apiKey: string
    apiHost?: string
};