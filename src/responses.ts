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


export type ResponseGetUsage = {
    readonly usedRequests: string,
    readonly requestsLeft: number,
}


export type GenerateUserAgentResponse = GenericResponse<{
    readonly UserAgent: string
    readonly secHeader: string
    readonly secFullVersionList: string
    readonly secPlatform: string
    readonly SecArch: string
}>


export type GenerateDatadomeCookieResponse = GenericResponse<{
    readonly userAgent: string
}>

export type GeneratePxCookiesResponse = GenericResponse<{
    readonly cookie: string
    readonly vid: string
    readonly UserAgent: string
    readonly data: string

    // desktop-specific – may be missing on mobile
    readonly cts?: string
    readonly isFlagged?: boolean
    readonly isMaybeFlagged?: boolean

    // mobile-specific – missing on desktop
    readonly uuid?: string
    readonly model?: string
    readonly device_fp?: string
}>


export type GenerateHoldCaptchaResponse = GeneratePxCookiesResponse & {
    readonly flaggedPOW: boolean
}
