const BaseRoute = require('./base/baseRoute');

class MainRoute extends BaseRoute {
    constructor(db) {
        super()
        this._fire = db;
    }

    getIndex() {
        return {
            method: 'GET',
            path: '/',
            handler: (_, reply) => {
                var user = this._fire.getCurrentUser();
                if (user !== null)
                    return reply.view('index');
                return reply.view('login');
            }
        };
    }

    getLogin() {
        return {
            method: 'GET',
            path: '/login',
            handler: (_, reply) => {
                var user = this._fire.getCurrentUser();
                if (user !== null)
                    return reply.view('index');
                return reply.view('login');
            }
        }
    }

    postLogin() {
        return {
            method: 'POST',
            path: '/login',
            handler: async (req, reply) => {
                await this._fire.login(req.payload.email, req.payload.password);

                var user = this._fire.getCurrentUser();
                if (user !== null)
                    return reply.view('index', {user: user.displayName});
                return reply.view('login')
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
            handler: (_, reply) => reply.view('404').code(404)
        };
    }
}

module.exports = MainRoute;