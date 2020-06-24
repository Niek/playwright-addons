## Modules

<dl>
<dt><a href="#module_playwright-addons/adblocker">playwright-addons/adblocker</a></dt>
<dd></dd>
<dt><a href="#module_playwright-addons/stealth">playwright-addons/stealth</a></dt>
<dd></dd>
</dl>

<a name="module_playwright-addons/adblocker"></a>

## playwright-addons/adblocker
<a name="exp_module_playwright-addons/adblocker--module.exports"></a>

### module.exports(br, [options]) ⏏
Enable the ad blocker add-on

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| br | <code>Browser</code> |  | the Browser object of Playwright |
| [options] | <code>Object</code> | <code>{}</code> | optional options to pass |
| [options.customList] | <code>string</code> |  | provide a custom block list URL instead of the standard one |
| [options.blockTrackers] | <code>boolean</code> | <code>false</code> | block trackers in addition to ads |

<a name="module_playwright-addons/stealth"></a>

## playwright-addons/stealth
<a name="exp_module_playwright-addons/stealth--module.exports"></a>

### module.exports(br) ⏏
Enable the stealth add-on

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| br | <code>Browser</code> | the Browser object of Playwright |

