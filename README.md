# 🚀 Parallax SDK: Datadome & Perimeterx

**Modern TypeScript SDK for bypassing DataDome and PerimeterX anti-bot protection.**

Designed for Node.js and TypeScript developers who value type safety and developer experience. This SDK provides full TypeScript support with intelligent autocomplete, type inference, and compile-time safety checks.

## ✨ Why Choose the TypeScript SDK?

- **🎯 Full Type Safety**: Complete TypeScript definitions with strict typing and IntelliSense support
- **⚡ Modern async/await**: Promise-based API built on native fetch and undici for optimal performance
- **🔧 Developer-Friendly**: Intuitive API design with helpful error messages and validation
- **🌐 Node.js Optimized**: Built specifically for Node.js environments with ESM support
- **📦 Lightweight**: Minimal dependencies with tree-shaking support
- **🛠️ Flexible Configuration**: Custom timeout, proxy support via undici dispatcher, and more

---

## 🚀 Quick Start

Get started with ParallaxAPIs SDK's in under 5 minutes:

1. **Join our [Discord](https://www.parallaxsystems.io/join?s=gh)** - Connect with our community
2. **Create a ticket** - Request your API key
3. **Get your free trial** - Start testing immediately
4. **[Install the SDK](#-installation)** - Choose your preferred language
5. **Solve all anti-bots in seconds** - Start bypassing DataDome, PerimeterX & more

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

// Advanced configuration with timeouts and custom dispatcher
import { ProxyAgent } from "undici";

const sdk = new DatadomeSDK({
    apiKey: "key",
    timeout: 30000,              // Request timeout in milliseconds (default: none) (optional)
    bodyTimeout: 10000,          // Body timeout in milliseconds (default: none) (optional)
    dispatcher: new ProxyAgent("http://proxy:port")  // Custom undici dispatcher (optional)
});
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

### 🏷️ Generate Datadome Tags Cookie

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const cookie = await sdk.generateDatadomeTagsCookie({
    site: "vinted",
    region: "pl",
    data: {
        cid: "null"
    },
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

### 📄 Parse HTML Challenge

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const htmlBody = `<html>... dd={'cid':'abc123','s':12345,'e':'error','t':'fe'} ...</html>`;
const prevCookie = "old_cookie_value";

const [taskData, productType] = sdk.parseChallengeHtml(htmlBody, prevCookie);

console.log(taskData, productType);

/*
    {
        cid: "old_cookie_value",
        b: "",
        e: "error",
        s: "12345",
        initialCid: "abc123",
    } captcha
*/
```

### 🔎 Detect and Parse Challenge

```javascript
import DatadomeSDK from "parallax-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "key" });

const responseBody = `<html>... dd={'cid':'abc123','s':12345,'e':'error','t':'fe'} ...</html>`;
const prevCookie = "old_cookie_value";

const [isBlocked, taskData, productType] = sdk.detectChallengeAndParse(responseBody, prevCookie);

console.log(isBlocked, taskData, productType);

/*
    true {
        cid: "old_cookie_value",
        b: "",
        e: "error",
        s: "12345",
        initialCid: "abc123",
    } captcha
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

// Advanced configuration with timeouts and custom dispatcher
import { ProxyAgent } from "undici";

const sdk = new PerimeterxSDK({
    apiKey: "key",
    timeout: 30000,              // Request timeout in milliseconds (default: none)
    bodyTimeout: 10000,          // Body timeout in milliseconds (default: none)
    dispatcher: new ProxyAgent("http://proxy:port")  // Custom undici dispatcher (optional)
});
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

- Full API docs & support: [Discord](https://www.parallaxsystems.io/join?s=gh)



## 🌟 Contributing

Got feedback or found a bug? Feel free to open an issue or send us a pull request!



## 🏢 Enterprise

Unlock enterprise-grade performance with custom solutions, expanded limits, and expert support. [Contact us](https://www.parallaxsystems.io/join?s=gh) to learn more.



## 📝 License

MIT

---
## 🔑 Keywords

**DataDome bypass** • **PerimeterX bypass** • **Anti-bot bypass** • **Bot detection bypass** • **CAPTCHA solver** • **Cookie generator** • **TypeScript web scraping** • **JavaScript bot automation** • **Node.js anti-bot** • **DataDome TypeScript SDK** • **PerimeterX TypeScript SDK** • **Headless browser alternative** • **Request-based bypass** • **TypeScript automation** • **Web scraping TypeScript** • **Bot mitigation bypass** • **Sensor data generation** • **Challenge solver** • **npm anti-bot**
