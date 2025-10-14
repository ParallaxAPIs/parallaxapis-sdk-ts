const encodeAndDecodeKey = (input: string, mode: "encode" | "decode") => {
    let encoded = '';

    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);
        let newCharCode = mode == "encode" ? charCode + 3 : charCode - 3;
        encoded += String.fromCharCode(newCharCode);
    }

    return encoded;
}

/**
 * Key encode function. This function is used for encoding auth key. You can find more information about this in parallax px docs.
 * @param input - Auth key.
 * @returns Encoded key 
 */
export const encodeKey = (input: string) => {
    return encodeAndDecodeKey(input, "encode");
}

/**
 * Key decode function. This function is used for decoding auth key. You can find more information about this in parallax px docs.
 * @param input - Auth key.
 * @returns Decoded key 
 */
export const decodeKey = (input: string) => {
    return encodeAndDecodeKey(input, "decode");
}
