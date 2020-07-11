# Add-ons for Playwright
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This package contains add-ons for the excellent [Playwright](https://github.com/microsoft/playwright/) browser automation framework. This package is still in development, so no releases yet.

#### Installation
```bash
npm i Niek/playwright-addons#master
```

#### Example usage
```js
(async () => {
    const browser = await require('playwright').chromium.launch({headless: false}); // or: firefox, webkit
    const addons = await import('playwright-addons');
    const page = await browser.newPage();

    await addons.adblocker(browser);
    await page.goto('https://cnn.com/');

    await addons.stealth(browser);
    await page.goto('https://bot.sannysoft.com/');
})();
```

#### Docker
Sample usage in Docker (run the script `test.js`):
```bash
docker container run -it --rm --ipc=host --cap-add=SYS_ADMIN -u root -p 5900:5900 -v $(pwd):/src -w /src \
  -e PLAYWRIGHT_BROWSERS_PATH=0 -e DEBIAN_FRONTEND=noninteractive -e X11VNC_CREATE_GEOM=1280x720x24 \
  -e FD_PROG="(fluxbox &) && xterm -hold -maximized -e npx nodemon test.js" mcr.microsoft.com/playwright:bionic sh -c \
  "apt-get install -qq -y x11vnc git fluxbox && su pwuser -c 'npm i nodemon Niek/playwright-addons#master && x11vnc -q -create -nopw -forever'"
```
You can then connect with a VNC client to localhost:5900. The process/browser will reload on any file changes.

#### Documentation
For generated documentation, see [the API docs](/api.md).
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Wapweb"><img src="https://avatars2.githubusercontent.com/u/8421581?v=4" width="100px;" alt=""/><br /><sub><b>Alexandr</b></sub></a><br /><a href="#ideas-Wapweb" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Niek/playwright-addons/commits?author=Wapweb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SentoxAIO"><img src="https://avatars0.githubusercontent.com/u/57367608?v=4" width="100px;" alt=""/><br /><sub><b>SentoxAIO</b></sub></a><br /><a href="#ideas-SentoxAIO" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!