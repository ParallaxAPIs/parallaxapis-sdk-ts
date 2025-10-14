import { ApiClient } from "./api";
import type { ClientSDKConfig, ApiClientConfig } from "./config";
import { DEFAULT_DATADOME_API_HOST } from "./constants";
import type { HtmlDatadomeBlockBody, JSONDatadomeBlockBody } from "./datadome-entities";
import type { GenerateDatadomeCookieResponse, GenerateUserAgentResponse } from "./responses";
import { ProductType, type TaskGenerateDatadomeCookie, type TaskGenerateDatadomeCookieData, type TaskGenerateUserAgent } from "./tasks";

// Datadome block url regexp
const datadomeBlockUrlRe = /geo\.captcha\-delivery\.com\/(?:interstitial|captcha)/;
// Datadome script object regexp
const datadomeHtmlScriptRe = /dd=\{[^}]+\}/;
// Regexp for single quoted keys, like 'key':...
const singleQuotedKeyRe = /'((?:[^'\\]|\\.)*)'\s*:/;
// Regexp for single quoted values, like ...:'value':
const singleQuotedValueRe = /:\s*'([^'\\]*(?:\\.[^'\\]*)*)'/;

export enum TTags {
    T_BV = "bv",
    T_FE = "fe",
    T_IT = "it",
}

export class DatadomeSDK extends ApiClient {
    /**
     * Creates an instance of DatadomeSDK.
     * Sets the API host to the default if not provided in the config.
     *
     * @param cfg Configuration object for the SDK, containing api key and optionally api host.
     */
    constructor(cfg: ClientSDKConfig) {
        if (!cfg?.apiHost) cfg.apiHost = DEFAULT_DATADOME_API_HOST;

        super({
            apiHost: cfg.apiHost,
            apiKey: cfg.apiKey,
        } satisfies ApiClientConfig);
    }

    /**
     * Generates a user agent data.
     *
     * @param task The task object containing parameters for user agent generation.
     * @returns A promise resolving to the generated user agent response.
     */
    public async generateUserAgent(task: TaskGenerateUserAgent): Promise<GenerateUserAgentResponse> {
        return await this.request("/useragent", task);
    }

    /**
     * Generates a DataDome cookie using the provided task parameters.
     *
     * @param task The task object containing parameters for cookie generation.
     * @returns A promise resolving to the generated DataDome cookie response.
     */
    public async generateCookie(task: TaskGenerateDatadomeCookie): Promise<GenerateDatadomeCookieResponse> {
        return await this.request("/gen", task);
    }

    /**
     * Parses a DataDome challenge URL and extracts the challenge data and product type.
     *
     * @param challengeUrl The challenge URL to parse.
     * @param prevDatadomeCookie The previous DataDome cookie value.
     * @returns A tuple containing the parsed challenge data and the product type.
     * @throws Error if the challenge type in the URL is unknown.
     */
    public parseChallengeUrl(challengeUrl: string, prevDatadomeCookie: string): [TaskGenerateDatadomeCookieData, ProductType] {
        const url = new URL(challengeUrl);

        const resultTouple: [TaskGenerateDatadomeCookieData, ProductType] = [
            {} as TaskGenerateDatadomeCookieData,
            ProductType.Init,
        ];

        if (url.pathname.startsWith("/captcha")) {
            resultTouple[1] = ProductType.Captcha;
        } else if (url.pathname.startsWith("/interstitial")) {
            resultTouple[1] = ProductType.Interstitial;
        } else if (url.pathname.startsWith("/init")) {
            resultTouple[1] = ProductType.Init;
        } else throw new Error("unknown challenge type in URL")

        const params = new URLSearchParams(challengeUrl.split("?")[1]);

        const taskData = {
            cid: prevDatadomeCookie,
            b: params.get("b") || "0",
            e: params.get("e") || "",
            s: params.get("s") || "",
            initialCid: params.get("initialCid") || "",
        }

        resultTouple[0] = taskData;

        return resultTouple;
    }

    /**
     * Parses a DataDome challenge JSON body and extracts the challenge data and product type.
     * Throws if the JSON is invalid or does not contain a 'url' property.
     */
    public parseChallengeJson(jsonBody: string, prevDatadomeCookie: string): [TaskGenerateDatadomeCookieData, ProductType] {
        let parsedBody: JSONDatadomeBlockBody;

        try {
            parsedBody = JSON.parse(jsonBody);
        } catch {
            throw new Error("unparsable DataDome JSON body");
        }

        if (!parsedBody.url) throw new Error("unparsable DataDome JSON body (couldn't extract url from response)");

        return this.parseChallengeUrl(parsedBody.url, prevDatadomeCookie);
    }

    /**
     * Parses a DataDome challenge HTML and extracts the challenge data and product type.
     * Throws if the HTML does not contain a recognizable dd object.
     */
    public parseChallengeHtml(htmlBody: string, prevDatadomeCookie: string): [TaskGenerateDatadomeCookieData, ProductType] {
        const match = htmlBody.match(datadomeHtmlScriptRe);

        if (!match) throw new Error("no DataDome values in HTML body");

        let objStr = match[0].slice(3); // skip 'dd='

        objStr = objStr.replace(singleQuotedKeyRe, '"$1":');
        objStr = objStr.replace(singleQuotedValueRe, ':"$1"');

        let dd: HtmlDatadomeBlockBody;

        try {
            dd = JSON.parse(objStr);
        } catch {
            throw new Error("no DataDome values in HTML body");
        }

        let pd: ProductType;

        switch (dd.t) {
            case TTags.T_IT:
                pd = ProductType.Interstitial;
                break;
            case TTags.T_FE:
                pd = ProductType.Captcha;
                break;
            case TTags.T_BV:
                throw new Error("permanently blocked by DataDome (t=bv)")
            default:
                throw new Error("unknown challenge type in HTML")
        }

        return [{
            b: dd.b || "",
            s: String(dd.s),
            e: dd.e,
            cid: prevDatadomeCookie,
            initialCid: dd.cid
        }, pd];
    }

    /**
     * Detects the challenge type in the body and parses accordingly.
     * Returns [blocked, data, productType].
     */
    public detectChallengeAndParse(body: string, prevDatadomeCookie: string): [boolean, TaskGenerateDatadomeCookieData | null, ProductType | null] {
        if (datadomeHtmlScriptRe.test(body)) {
            const [data, pd] = this.parseChallengeHtml(body, prevDatadomeCookie);
            return [true, data, pd];
        } else if (datadomeBlockUrlRe.test(body)) {
            const [data, pd] = this.parseChallengeJson(body, prevDatadomeCookie);
            return [true, data, pd];
        }

        return [false, null, null];
    }
}