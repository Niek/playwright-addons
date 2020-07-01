/**
 * @module playwright-addons/adblocker
 */

import blocker from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';

/**
 * Enable the ad blocker add-on
 * @param {Browser} br - the Browser object of Playwright
 * @param {Object} [options={}] - optional options to pass
 * @param {string} [options.customList] - provide a custom block list URL instead of the standard one
 * @param {boolean} [options.blockTrackers=false] - block trackers in addition to ads
 */
export default async function (br, options = {}) {
    if (typeof br !== 'object' || !br.contexts) {
        console.error('Need to provide a Playwright Browser object');
    } else {
        let bl;
        if (options.customList) {
            bl = await blocker.PlaywrightBlocker.fromLists(fetch, options.customList);
        } else if (options.blockTrackers) {
            bl = await blocker.PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        } else {
            bl = await blocker.PlaywrightBlocker.fromPrebuiltAdsOnly(fetch);
        }

        br.contexts().forEach(c => {
            // Existing pages
            c.pages().forEach(p => bl.enableBlockingInPage(p));

            // New pages
            c.on('page', async p => {
                await bl.enableBlockingInPage(p);
            });
        });
        console.log('Adblocker enabled');
    }
}