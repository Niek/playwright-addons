# Add-ons for Playwright

This package contains add-ons for the excellent [Playwright](https://github.com/microsoft/playwright/) browser automation framework. This package is still in development, so no releases yet.

#### Installation
```bash
npm i Niek/playwright-addons#master
```

#### Example usage
```js
const { chromium } = require('playwright');
const { addons } = import('playwright-addons');

(async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    await addons.adblocker(browser);
    await page.goto('https://cnn.com/');

    await addons.stealth(browser);
    await page.goto('https://bot.sannysoft.com/');
})();
```