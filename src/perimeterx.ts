import { ApiClient } from "./api";
import type { ApiClientConfig, ClientSDKConfig } from "./config";
import { DEFAULT_PX_API_HOST } from "./constants";
import type {
  GenerateHoldCaptchaResponse,
  GeneratePxCookiesResponse,
} from "./responses";
import {
  type TaskGenerateHoldCaptcha,
  type TaskGeneratePXCookies,
} from "./tasks";

export class PerimeterxSDK extends ApiClient {
  /**
   * Creates an instance of PerimeterxSDK.
   * Sets the API host to the default if not provided in the config.
   *
   * @param cfg Configuration object for the SDK, containing apiKey and optionally apiHost.
   */
  constructor(cfg: ClientSDKConfig) {
    if (!cfg?.apiHost) cfg.apiHost = DEFAULT_PX_API_HOST;

    super({
      ...cfg,
      apiHost: cfg.apiHost,
    } satisfies ApiClientConfig);
  }

  /**
   * Generates PX cookies using the provided task parameters.
   *
   * @param task The task object containing parameters for PX cookie generation.
   * @returns A promise resolving to the generated PX cookies response.
   */
  public async generateCookies(
    task: TaskGeneratePXCookies,
  ): Promise<GeneratePxCookiesResponse> {
    return await this.request("/gen", task);
  }

  /**
   * Generates a holdcaptcha response using the provided task parameters.
   *
   * @param task The task object containing parameters for holdcaptcha generation.
   * @returns A promise resolving to the generated holdcaptcha response.
   */
  public async generateHoldCaptcha(
    task: TaskGenerateHoldCaptcha,
  ): Promise<GenerateHoldCaptchaResponse> {
    return await this.request("/holdcaptcha", task);
  }
}
