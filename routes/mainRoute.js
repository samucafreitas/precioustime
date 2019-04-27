const BaseRoute = require('./base/baseRoute');

class MainRoute extends BaseRoute {
    constructor(db) {
        super()
        this.db = db;
    }

    getIndex() {
        return {
            method: 'GET',
            path: '/',
            handler: (_, h) => {
                var user = this.db.getCurrentUser();
                if (user !== null)
                    return h.view('index');
                return h.view('login');
            }
        };
    }

    getLogin() {
        return {
            method: 'POST',
            path: '/login',
            handler: async (req, h) => {
                var l = await this.db.login(req.payload.email, req.payload.password);
                console.log(l)
                var user = this.db.getCurrentUser();
                if (user !== null)
                    return h.view('index');
                return h.view('login')
            }
        }
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