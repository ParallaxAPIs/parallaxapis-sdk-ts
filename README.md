# <img src="https://github.com/ParallaxAPIs/.github/blob/main/profile/logo.png" alt="Parallax Logo" width="30" height="30" style="vertical-align: middle;"> ParallaxAPIs SDK - TypeScript Library for Bot Protection Bypass (Datadome & PerimeterX)


![license MIT](https://img.shields.io/static/v1?label=license&message=MIT&color=99cc33&labelColor=111111) ![Node.js version](https://img.shields.io/static/v1?label=Node.js&message=17%2B&color=007ec6&labelColor=555555) ![downloads](https://img.shields.io/static/v1?label=downloads&message=1.2k%2Fmonth&color=brightgreen&labelColor=111111)

[![Discord](https://img.shields.io/static/v1?label=ParallaxAPIs&message=1.870%20Members&color=111111&labelColor=5865F2&style=for-the-badge&logo=discord&logoColor=white)](https://www.parallaxsystems.io/join?s=gh)

**TypeScript SDK for bypassing DataDome and PerimeterX anti-bot protection.**
## 📖 Overview

ParallaxAPIs provides a **request-based solution** for bypassing DataDome and PerimeterX anti-bot systems. Instead of relying on slow, resource-heavy browser automation, our API generates valid cookies and tokens in **200-400ms** through direct HTTP requests.

**What We Solve:**

- ✅ **DataDome** - Slider captchas, interstitial pages, cookie generation, tags payload
- ✅ **PerimeterX** - Cookie generation (_px3), challenge solver, vid & cts tokens

**Key Benefits:**

- ⚡ **Lightning Fast** - 200-400ms response times vs 5-10+ seconds for browsers
- 🔧 **Simple Integration** - Clean API with comprehensive documentation, no browser management required
- 🚀 **Highly Scalable** - Handle thousands of concurrent requests with minimal resources
- ⚙️ **Flexible Configuration** - Custom timeouts, HTTP clients, and proxy settings
- 💰 **Cost Effective** - Lightweight infrastructure, minimal proxy usage
- 🔄 **Always Updated** - We handle all reverse engineering and updates for you

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
npm install parallaxapis-sdk-ts
```

![NPM Install Demo](https://github.com/ParallaxAPIs/.github/blob/main/profile/npminstallts.gif)

---

## 🧑‍💻 Datadome Usage

### ⚡ SDK Initialization

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

// Basic initialization with API key
const sdk = new DatadomeSDK({ apiKey: "Key" });

// Custom host
const sdk = new DatadomeSDK({ apiKey: "Key", apiHost: "example.host.com" });

// Advanced configuration with timeouts and custom dispatcher
import { ProxyAgent } from "undici";

const sdk = new DatadomeSDK({
  apiKey: "Key",
  timeout: 30000, // Request timeout in milliseconds (default: none) (optional)
  bodyTimeout: 10000, // Body timeout in milliseconds (default: none) (optional)
  dispatcher: new ProxyAgent("http://proxy:port", {
    requestTls: { rejectUnauthorized: false }
  }) // Custom undici dispatcher (optional)
});

const usedRequests = await sdk.checkUsage("site")
console.log(usedRequests);
```

### 🕵️‍♂️ Generate New User Agent

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const userAgent = await sdk.generateUserAgent({
  region: "com",
  site: "site",
});

console.log(userAgent);
```

### 🔍 Get Task Data

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const [taskData, productType] = sdk.parseChallengeUrl(
  "https://www.example.com/captcha/?initialCid=initialCid&cid=cid&referer=referer&hash=hash&t=t&s=s&e=e",
  "cookie_value",
);

console.log(taskData, productType);
```

### 📄 Parse HTML Challenge

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const htmlBody = "<html><script>dd={example:1}</script></html>";
const prevCookie = "cookie_value";

const [taskData, productType] = sdk.parseChallengeHtml(htmlBody, prevCookie);

console.log(taskData, productType);
```

### 🍪 Generate Cookie

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const [taskData, productType] = sdk.parseChallengeUrl(
  "https://www.example.com/captcha/?initialCid=initialCid&cid=cid&referer=referer&hash=hash&t=t&s=s&e=e",
  "cookie_value",
);

const cookie = await sdk.generateCookie({
  site: "site",
  region: "com",
  data: taskData,
  pd: productType,
  proxy: "http://user:pas@addr:port",
  proxyregion: "eu",
});

console.log(cookie);
```

### 🏷️ Generate Tags Cookie

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const cookie = await sdk.generateDatadomeTagsCookie({
  site: "site",
  region: "com",
  data: {
    cid: "null",
  },
  proxy: "http://user:pas@addr:port",
  proxyregion: "eu",
});

console.log(cookie);
```

### 🔎 Detect and Parse Challenge

```javascript
import { DatadomeSDK } from "parallaxapis-sdk-ts";

const sdk = new DatadomeSDK({ apiKey: "Key" });

const responseBody = "<html>...</html>"; // Response body from website
const prevCookie = "cookie_value";

const [isBlocked, taskData, productType] = sdk.detectChallengeAndParse(
  responseBody,
  prevCookie,
);

console.log(isBlocked, taskData, productType);
```

---

## 🛡️ Perimeterx Usage

### ⚡ SDK Initialization

```javascript
import { PerimeterxSDK } from "parallaxapis-sdk-ts";

// Basic initialization with API key
const sdk = new PerimeterxSDK({ apiKey: "Key" });

// Custom host
const sdk = new PerimeterxSDK({ apiKey: "Key", apiHost: "example.host.com" });

// Advanced configuration with timeouts and custom dispatcher
import { ProxyAgent } from "undici";

const sdk = new PerimeterxSDK({
  apiKey: "Key",
  timeout: 30000, // Request timeout in milliseconds (default: none)
  bodyTimeout: 10000, // Body timeout in milliseconds (default: none)
  dispatcher: new ProxyAgent("http://proxy:port", {
    requestTls: { rejectUnauthorized: false }
  }) // Custom undici dispatcher (optional)
});

const usedRequests = await sdk.checkUsage("site")
console.log(usedRequests);
```

### 🍪 Generate PX Cookie

```javascript
import { PerimeterxSDK } from "parallaxapis-sdk-ts";
import type { TaskGenerateHoldCaptcha, TaskGeneratePXCookies } from "parallaxapis-sdk-ts";

const sdk = new PerimeterxSDK({
    apiKey: "Key",
});

const result = await sdk.generateCookies({
    proxy: "http://user:pas@addr:port",
    proxyregion: "eu",
    region: "com",
    site: "site"
} satisfies TaskGeneratePXCookies);

console.log(JSON.stringify(result))


const holdCaptchaResult = await sdk.generateHoldCaptcha({
    proxy: "http://user:pas@addr:port",
    proxyregion: "eu",
    region: "com",
    site: "site",
    data: result.data,
} satisfies TaskGenerateHoldCaptcha);

console.log(JSON.stringify(holdCaptchaResult))
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
