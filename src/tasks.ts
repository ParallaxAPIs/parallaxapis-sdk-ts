export type ProxyAddress = `http://${string}`;

/**
 * Enum for DataDome product types.
 * - Captcha: Captcha challenge
 * - Interstitial: Interstitial page
 * - Init: Initialization
 */
export enum ProductType {
    Captcha = "captcha",
    Interstitial = "interstitial",
    Init = "init"
}

/**
 * Generic task type that includes authentication.
 * @template T - The payload type for the task.
 * @property auth - The authentication string (API key).
 */
export type GenericTask<T> = T & {
    auth: string
}

/**
 * Task for generating a user agent data.
 * @property pd - Currently not important, any value works.
 * @property site - The site's top-level domain (e.g., "com").
 * @property region - Defines the product type, with three possible values: captcha, interstitial, init. These types are available in ProductType enum.
 */
export type TaskGenerateUserAgent = {
    pd?: string
    site: string
    region: string
};

/**
 * Data required for generating a Datadome cookie.
 * @property cid - The DataDome cookie (mandatory for all products). If you request the site and receive a 200 response without a Set-Cookie header, set the cid value to "null" for init generation.
 * @property e - Challenge parameter e (Required only for the captcha product).
 * @property s - Challenge parameter s (Exists in both captcha and interstitial).
 * @property b - Always exists for interstitial. Some sites also require it for captcha.
 * @property initialCid - Present in captcha and interstitial responses; derived from DataDome's response block by splitting the response value at `"cid:"`.
 */
export type TaskGenerateDatadomeCookieData = {
    cid: string,
    e: string,
    s: string,
    b: string,
    initialCid: string
}

/**
 * Task for generating a DataDome cookie.
 * @property site - Site for which to generate the cookie.
 * @property region - Site region.
 * @property proxyregion - Proxy region.
 * @property proxy - Proxy address.
 * @property pd - Product type.
 * @property data - Data required for cookie generation.
 */
export type TaskGenerateDatadomeCookie = {
    site: string
    region: string
    proxyregion: string,
    proxy: ProxyAddress,
    pd: ProductType,
    data: TaskGenerateDatadomeCookieData
};

/**
 * Task for generating PX cookies.
 * @property site - Site for which to generate PX cookies.
 * @property proxyregion - Proxy region.
 * @property region - Site region.
 * @property proxy - Proxy address.
 */
export type TaskGeneratePXCookies = {
    site: string
    proxyregion: string
    region: string,
    proxy: ProxyAddress,
};

/**
 * Task for hold captcha challenge.
 * @property site - Site for which to solve hold captcha (e.g., "stockx").
 * @property proxyregion - The region of your proxy (either "eu" or "us")..
 * @property region - The region of the site (e.g., "com" for .com sites or other TLDs like ".fr" or ".ch")..
 * @property proxy - The proxy used for the request in HTTP format. Cookies must be generated with a proxy, they cannot be shared with other IPs.
 * @property POW_PRO - (Optional) Insert your Cuda POW solver key here if you want to use Cuda as the solution method for the proof-of-work challenge. If you leave this field blank, the system will try to solve the POW with the normal system, which only works with unflagged proxies.
 * @property data - Hold captcha challenge data string.
 */
export type TaskGenerateHoldCaptcha = {
    site: string
    proxyregion: string
    region: string,
    proxy: ProxyAddress,
    POW_PRO?: string,
    data: string,
};
