# 🚀 Parallax SDK: Datadome & Perimeterx

Easily interact with Datadome and Perimeterx anti-bot solutions using a simple TypeScript SDK. Fast integration, clear API! ✨

---

## 📦 Installation

```bash
npm install parallax-sdk-ts
```

---

## 🧑‍💻 Datadome Usage

### ⚡ SDK Initialization

```javascript
import DatadomeSDK from "parallax-sdk-ts";

// Basic initialization with API key
const sdk = new DatadomeSDK({ apiKey: "key" });

// Custom host
const sdk = new DatadomeSDK({ apiKey: "key", apiHost: "example.host.com" });
```

### 🕵️‍♂️ Generate New User Agent

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const userAgent = await sdk.generateUserAgent({
    region: "pl",
    site: "vinted",
    pd: "optional"
});

console.log(userAgent)

/*
    {
        error: false,
        message: "New device successfully created.",
        UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        secHeader: "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
        secFullVersionList: "\"Chromium\";v=\"136.0.0.0\", \"Google Chrome\";v=\"136.0.0.0\", \"Not.A/Brand\";v=\"99.0.0.0\"",
        secPlatform: "\"Windows\"",
        secArch: "\"x86\"",
    }
*/
```

### 🔍 Get Task Data

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const [taskData, productType] = sdk.parseChallengeUrl(
    "https://geo.captcha-delivery.com/captcha/?initialCid=initialCid&cid=cid&referer=referer&hash=hash&t=t&s=s&e=e",
    "cookie",
);

console.log(taskData, productType)

/*
    {
        cid: "cookie",
        b: "",
        e: "e",
        s: "s",
        initialCid: "initialCid",
    } captcha
*/
```

### 🍪 Generate Cookie

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const [taskData, productType] = sdk.parseChallengeUrl(
    "https://geo.captcha-delivery.com/captcha/?initialCid=initialCid&cid=cid&referer=referer&hash=hash&t=t&s=s&e=e",
    "cookie",
);

const cookie = await sdk.generateCookie({
    site: "vinted",
    region: "pl",
    data: taskData,
    pd: productType,
    proxy: "http://user:pas@addr:port",
    proxyregion: "eu"
});

console.log(cookie);

/*
   {
        error: false,
        message: "datadome=cookie_value",
        UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    }
*/
```

---

## 🛡️ Perimeterx Usage

### ⚡ SDK Initialization

```javascript
import PerimeterxSDK from "parallax-sdk-ts";

// Basic initialization with API key
const sdk = new PerimeterxSDK({ apiKey: "key" });

// Custom host
const sdk = new PerimeterxSDK({ apiKey: "key", apiHost: "example.host.com" });
```

### 🍪 Generate PX Cookie

```javascript
import PerimeterxSDK from "parallax-sdk-ts";
import type { TaskGenerateHoldCaptcha, TaskGeneratePXCookies } from "parallax-sdk-ts";

const sdk = new PerimeterxSDK({
    apiKey: "key",
});

const result = await sdk.generateCookies({
    proxy: "http://user:pas@addr:port",
    proxyregion: "eu",
    region: "com",
    site: "stockx"
} satisfies TaskGeneratePXCookies);

console.log(JSON.stringify(result))

/*
    {
        "error": false,
        "cookie": "_px3=d3sswjaltwxgAd...",
        "vid": "514d7e11-6962-11f0-810f-88cc16043287",
        "cts": "514d8e28-6962-11f0-810f-51b6xf2786b0",
        "secHeader": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "isFlagged": false,
        "isMaybeFlagged": true,
        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "data": "==WlrBti6vpO6rshP1CFtBsiocoO8..."
    }
*/

const holdCaptchaResult = await sdk.generateHoldCaptcha({
    proxy: "http://user:pas@addr:port",
    proxyregion: "eu",
    region: "com",
    site: "stockx",
    data: result.data,
} satisfies TaskGenerateHoldCaptcha);

console.log(JSON.stringify(holdCaptchaResult))

/*
    {
        "error": false,
        "cookie": "_px3=d3sswjaltwxgAd...",
        "vid": "514d7e11-6962-11f0-810f-88cc16043287",
        "cts": "514d8e28-6962-11f0-810f-51b6xf2786b0",
        "secHeader": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "isFlagged": false,
        "isMaybeFlagged": true,
        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "data": "==WlrBti6vpO6rshP1CFtBsiocoO8...", 
        "flaggedPOW": false 
    }
*/
```

---

## 📚 Documentation & Help

- Full API docs: [GitHub](https://github.com/parallaxsystems/parallax-sdk-ts)
- Issues & support: [GitHub Issues](https://github.com/parallaxsystems/parallax-sdk-ts/issues)

---

## 📝 License

MIT

---

Made with ❤️ by Parallax Systems

