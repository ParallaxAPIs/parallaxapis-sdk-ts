/**
 * Generic API response type. It wraps expeted response data with error and message fields.
 * @template T - The payload type for the response.
 * @property error - Indicates if the response contains an error.
 * @property message - (Optional) Error or status message.
 * @property cookie - (Optional) Cookie value returned by the API.
 */
export type GenericResponse<T> = T & {
    readonly error: boolean
    readonly cookie?: string
    message?: string
}

/**
 * Response type for usage data.
 * @property usedRequests - Number of requests used (as a string).
 * @property leftRequests - Number of requests left.
 */
export type ResponseGetUsage = {
    readonly usedRequests: string,
    readonly leftRequests: number,
}

/**
 * Response type for user agent generation.
 * @property userAgent - The generated user agent string.
 * @property secHeader - SecHeader header value.
 * @property secFullVersionList - SecFullVersionList header value.
 * @property secPlatform - SecPlatform header value.
 * @property SecArch - SecArch header value.
 */
export type GenerateUserAgentResponse = GenericResponse<{
    readonly UserAgent: string
    readonly secHeader: string
    readonly secFullVersionList: string
    readonly secPlatform: string
    readonly SecArch: string
}>

/**
 * Response type for DataDome cookie generation.
 * @property userAgent - The user agent string used for cookie generation.
 */
export type GenerateDatadomeCookieResponse = GenericResponse<{
    readonly userAgent: string
}>

/**
 * Response type for PX cookies generation.
 * @property cookie - Includes the generated cookie or an error message if error is true.
 * @property vid - Used to set the _pxvid cookie.
 * @property cts - Used to set the pxcts cookie.
 * @property isFlagged - Indicate if the generation might have been flagged during generation.
 * @property isMaybeFlagged - Indicate if the generation might have been flagged during generation.
 * @property UserAgent - The device used for generation. Set this along with the cookie to ensure a proper match.
 * @property data - A string for backend purposes, used to generate the next step. Save this value.
 */
export type GeneratePxCookiesResponse = GenericResponse<{
    readonly cookie: string,
    readonly vid: string
    readonly cts: string
    readonly isFlagged: boolean
    readonly isMaybeFlagged: boolean
    readonly UserAgent: string
    readonly data: string
}>

/**
 * Response type for holding a captcha challenge.
 * Extends GeneratePxCookiesResponse and adds flaggedPOW.
 * @property flaggedPOW - Indicates if pow is flagged.
 */
export type GenerateHoldCaptchaResponse = GeneratePxCookiesResponse & {
    readonly flaggedPOW: boolean
}
