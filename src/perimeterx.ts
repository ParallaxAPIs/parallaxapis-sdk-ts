import { ApiClient } from "./api";
import type { ClientSDKConfig, ApiClientConfig } from "./config";
import { DEFAULT_PX_API_HOST } from "./constants";
import type { GenerateHoldCaptchaResponse, GeneratePxCookiesResponse } from "./responses";
import { type TaskGenerateHoldCaptcha, type TaskGeneratePXCookies } from "./tasks";
import { encodeKey } from "./utils";

export class PerimeterxSDK extends ApiClient {
    /**
     * Creates an instance of PerimeterxSDK.
     * Sets the API host to the default if not provided in the config and encodes the API key.
     *
     * @param cfg Configuration object for the SDK, containing apiKey and optionally apiHost.
     */
    constructor(cfg: ClientSDKConfig) {
        if (!cfg?.apiHost) cfg.apiHost = DEFAULT_PX_API_HOST;

        super({
            apiHost: cfg.apiHost,
            apiKey: encodeKey(cfg.apiKey),
        } satisfies ApiClientConfig);
    }

    /**
     * Generates PX cookies using the provided task parameters.
     *
     * @param task The task object containing parameters for PX cookie generation.
     * @returns A promise resolving to the generated PX cookies response.
     */
    public async generateCookies(task: TaskGeneratePXCookies): Promise<GeneratePxCookiesResponse> {
        return await this.request("/gen", task);
    }

    /**
     * Generates a hold captcha response using the provided task parameters.
     *
     * @param task The task object containing parameters for hold captcha generation.
     * @returns A promise resolving to the generated hold captcha response.
     */
    public async generateHoldCaptcha(task: TaskGenerateHoldCaptcha): Promise<GenerateHoldCaptchaResponse> {
        return await this.request("/holdcaptcha", task);
    }
}