import { request } from "undici";
import type { ApiClientConfig } from "./config";
import type { GenericResponse, ResponseGetUsage } from "./responses";
import type { GenericTask } from "./tasks";

export type Endpoint = `/${string}`;

export class ApiClient {
  private apiHost = "";
  private apiKey = "";
  private requestOptions: Parameters<typeof request>[1];

  /**
   * Creates an instance of a Client.
   * @param cfg Configuration object containing host and api key.
   */
  constructor(cfg: ApiClientConfig) {
    this.apiHost = cfg.apiHost;
    this.apiKey = cfg.apiKey;

    this.requestOptions = {};

    if (cfg.timeout) this.requestOptions.headersTimeout = cfg.timeout;
    if (cfg.bodyTimeout) this.requestOptions.bodyTimeout = cfg.bodyTimeout;
    if (cfg.dispatcher) this.requestOptions.dispatcher = cfg.dispatcher;
  }

  protected async request<T extends GenericResponse<{}>, TBody>(
    endpoint: Endpoint,
    body: TBody,
  ): Promise<T> {
    const url = `https://${this.apiHost}${endpoint}`;

    const payload: GenericTask<TBody> = {
      auth: this.apiKey,
      ...body,
    };

    const options = {
      ...this.requestOptions,
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    };

    const res = await request(url, options);

    if (res.statusCode != 200)
      throw new Error(
        `Unexpected status code returned from parallax api:\n ${await res.body.text()}`,
      );

    const resBody = (await res.body.json()) as T;

    if (resBody.error) {
      if (!resBody.message) resBody.message = JSON.stringify(resBody, null, 2) //dd px system mismatch, needs to be updated in future
      throw new Error(
        `Api responded with error, error message: ${resBody.message}`,
      );
    }

    return resBody;
  }

  /**
   * Checks usage statistics for a given site.
   *
   * @param site The site identifier to check usage for.
   * @returns A promise resolving to the usage response.
   */
  public async checkUsage(site: string): Promise<ResponseGetUsage> {
    const res = await request(
      `https://${this.apiHost}/usage?authToken=${this.apiKey}&site=${site}`
    );

    const resBody = (await res.body.json()) as ResponseGetUsage;

    return resBody;
  }
}
