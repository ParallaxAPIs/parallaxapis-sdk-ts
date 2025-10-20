export type ProxyAddress = `${'http' | 'https' | 'socks' | 'socks5' | 'socks5h'}://${string}`

/**
 * Enum for DataDome product types.
 * - Captcha: Captcha challenge
 * - Interstitial: Interstitial page
 * - Init: Tags.js
 */
export enum ProductType {
    Captcha = "captcha",
    Interstitial = "interstitial",
    Init = "init"
}

export type GenericTask<T> = T & {
    auth: string
}

export type TaskGenerateUserAgent = {
    pd?: string
    site: string
    region: string
};

export type TaskGenerateDatadomeCookieData = {
    cid: string,
    e: string,
    s: string,
    b: string,
    initialCid: string
}

/**
 * Task for generating a DataDome tags cookie cookie.
 * @property site - Site for which to generate the cookie.
 * @property region - Site region.
 * @property proxyregion - Proxy region.
 * @property proxy - Proxy address.
 * @property pd - Product type.
 * @property data - Data required for cookie generation, only cid value with null is needed.
 */
export type TaskGenerateDatadomeTags = {
    site: string
    region: string
    proxyregion: string,
    proxy: ProxyAddress,
    data: Pick<TaskGenerateDatadomeCookieData, "cid">
};

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
 * Task for holdcaptcha challenge.
 * @property site - Site for which to solve holdcaptcha 
 * @property proxyregion - The region of your proxy (either "eu" or "us")..
 * @property region - The region of the site (e.g., "com" for .com sites or other TLDs like ".fr" or ".ch")..
 * @property proxy - The proxy used for the request in HTTP format. Cookies must be generated with a proxy, they cannot be shared with other IPs.
 * @property POW_PRO - (Optional) Insert your Cuda POW solver key here if you want to use Cuda as the solution method for the proof-of-work challenge. If you leave this field blank, the system will try to solve the POW with the normal system, which only works with unflagged proxies.
 * @property data - holdcaptcha challenge data string.
 */
export type TaskGenerateHoldCaptcha = {
    site: string
    proxyregion: string
    region: string,
    proxy: ProxyAddress,
    POW_PRO?: string,
    data: string,
};
