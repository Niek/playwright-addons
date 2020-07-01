/**
 * @module playwright-addons/stealth
 */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Enable the stealth add-on
 * @param {Browser} br - the Browser object of Playwright
 */
 export default async function (br) {
    if (typeof br !== 'object' || !br.contexts) {
        console.error('Need to provide a Playwright Browser object');
    } else {
        br.contexts().forEach(async c => {
            // Init evasions script on every page load
            await c.addInitScript({ path: dirname(fileURLToPath(import.meta.url)) + '/evasions.js' });

            // Properly set UA info (vanilla Playwright only sets the UA)
            const userAgent = c._options.userAgent || '';
            const acceptLanguage = c._options.locale;
            const platform = userAgent.indexOf('Macintosh') !== -1 ? 'MacIntel' : (userAgent.indexOf('Windows') !== -1 ? 'Win32' : '');
            const userAgentMetadata = undefined; // TODO, see https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#type-UserAgentMetadata

            c.pages().forEach(async p =>
                (await p.context().newCDPSession(p)).send('Emulation.setUserAgentOverride', { userAgent, acceptLanguage, platform, userAgentMetadata })
            );

            c.on('page', async p =>
                (await p.context().newCDPSession(p)).send('Emulation.setUserAgentOverride', { userAgent, acceptLanguage, platform, userAgentMetadata })
            );
        });

        console.log('Stealth enabled');
    }
}