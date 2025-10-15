import { request } from 'undici';
import type { ApiClientConfig } from './config';
import type { GenericResponse, ResponseGetUsage } from './responses';
import type { GenericTask } from './tasks';

export type Endpoint = `/${string}`;

export class ApiClient {
    private apiHost = "";
    private apiKey = "";

    /**
     * Creates an instance of a Client.
     * @param cfg Configuration object containing host and api key.
     */
    constructor(cfg: ApiClientConfig) {
        this.apiHost = cfg.apiHost;
        this.apiKey = cfg.apiKey;
    }

    /**
     * Sends a POST request to the specified API endpoint with the provided payload.
     *
     * @template T The expected response type.
     * @template TBody The request body type.
     * @param endpoint The API endpoint to send the request to.
     * @param body The request body payload.
     * @returns A promise resolving to the API response.
     * @throws Error if the API responds with an error.
     */
    protected async request<T extends GenericResponse<{}>, TBody>(endpoint: Endpoint, body: TBody): Promise<T> {
        const url = `https://${this.apiHost}${endpoint}`;

        const payload: GenericTask<TBody> = {
            auth: this.apiKey,
            ...body
        }

        const res = await request(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
            throwOnError: false,
        })

        if (res.statusCode != 200) throw new Error(`Unexpected status code returned from parallax api: ${res.statusCode}`);

        const resBody = await res.body.json() as T;

        if (resBody.error) {
            if (!resBody.message) resBody.message = resBody.cookie;
            throw new Error(`Api responded with error, error message: ${resBody.message}`)
        };

        return resBody;
    }

    /**
     * Checks usage statistics for a given site.
     *
     * @param site The site identifier to check usage for.
     * @returns A promise resolving to the usage response.
     */
    public async checkUsage(site: string): Promise<ResponseGetUsage> {
        const res = await request(`https://${this.apiHost}/usage?authToken=${this.apiKey}&site=${site}`, {
            throwOnError: false
        });

        const resBody = await res.body.json() as ResponseGetUsage;

        return resBody;
    }
}