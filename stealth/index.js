export default async function (br) {
    if (typeof br !== 'object' || !br.contexts) {
        console.error('Need to provide a Playwright Browser object');
    } else {
        for (let i = 0; i < br.contexts().length; i++) {
            await br.contexts()[i].addInitScript({ path: 'stealth/evasions.js' });
        }
        console.log('Stealth enabled');
    }
}