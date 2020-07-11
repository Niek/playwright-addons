// Delete webdriver
delete Object.getPrototypeOf(navigator).webdriver;

//Overwrite the `plugins` property
Object.defineProperty(navigator, "plugins", {
	get: function () {
		return [1, 2, 3, 4, 5];
	},
});

// Fake webGL vendor + renderer
try {
    // Remove traces of our Proxy ;-)
    var stripErrorStack = stack =>
        stack
            .split('\n')
            .filter(line => !line.includes(`at Object.apply`))
            .filter(line => !line.includes(`at Object.get`))
            .join('\n')

    const getParameterProxyHandler = {
        get(target, key) {
            try {
                // Mitigate Chromium bug (#130)
                if (typeof target[key] === 'function') {
                    return target[key].bind(target)
                }
                return Reflect.get(target, key)
            } catch (err) {
                err.stack = stripErrorStack(err.stack)
                throw err
            }
        },
        apply: function (target, thisArg, args) {
            const param = (args || [])[0]
            // UNMASKED_VENDOR_WEBGL
            if (param === 37445) {
                return 'Intel Inc.'
            }
            // UNMASKED_RENDERER_WEBGL
            if (param === 37446) {
                return 'Intel Iris OpenGL Engine'
            }
            try {
                return Reflect.apply(target, thisArg, args)
            } catch (err) {
                err.stack = stripErrorStack(err.stack)
                throw err
            }
        }
    }

    const proxy = new Proxy(
        WebGLRenderingContext.prototype.getParameter,
        getParameterProxyHandler
    )
    // To find out the original values here: Object.getOwnPropertyDescriptors(WebGLRenderingContext.prototype.getParameter)
    Object.defineProperty(WebGLRenderingContext.prototype, 'getParameter', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: proxy
    })
} catch (err) {
    console.warn(err)
}

// Fake hairline feature, see https://github.com/Niek/playwright-addons/issues/2
const _osH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
Object.defineProperty(HTMLDivElement.prototype, 'offsetHeight', {
    ..._osH,
    get: function () {
        return this.id === 'modernizr' ? 1 : _osH.get.apply(this);
    }
})
