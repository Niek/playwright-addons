import blocker from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';

export default async function (br) {
    if (typeof br !== 'object' || !br.contexts) {
        console.error('Need to provide a Playwright Browser object');
    } else {
        const bl = await blocker.PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        br.contexts().forEach(c => {
            // Existing pages
            for (let i = 0; i < c.pages().length; i++) {
                bl.enableBlockingInPage(c.pages()[i]);
            }
            // New pages
            c.on('page', async p => {
                await bl.enableBlockingInPage(p);
            });
        });
        console.log('Adblocker enabled');
    }
}