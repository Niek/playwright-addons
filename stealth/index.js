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
        for (let i = 0; i < br.contexts().length; i++) {
            await br.contexts()[i].addInitScript({ path: dirname(fileURLToPath(import.meta.url)) + '/evasions.js' });
        }
        console.log('Stealth enabled');
    }
}