const BaseRoute = require('./base/baseRoute');

class MainRoute extends BaseRoute {
    constructor() {
        super()
    }

    getIndex() {
        return {
            method: 'GET',
            path: '/',
            handler: (_, h) => h.view('index')
        };
    }

    getPublicJs() { 
        return {
            method: 'GET',
            path: '/js/{file*}',
            handler: {
                directory: {
                    path: 'public/js',
                    listing: true
                }
            }
        };
    }

    getPublicCss() {
        return {
            method: 'GET',
            path: '/css/{file*}',
            handler: {
                directory: {
                    path: 'public/css',
                    listing: true
                }
            }
        };
    }

    getError() {
        return {
            method: 'GET',
            path: '/{path*}',
            handler: (_, h) => h.view('404')
        };
    }
}

module.exports = MainRoute;