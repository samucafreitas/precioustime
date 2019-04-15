const BaseRoute = require('./base/baseRoute');
const FireDB = require('../db/strategies/firebase/fireDB');

class MainRoute extends BaseRoute {
    constructor() {
        super()
    }

    getIndex() {
        return {
            method: 'GET',
            path: '/',
            handler: (_, h) => {
                if (FireDB.getAuth() != null)
                    if (FireDB.getAuth().auth().currentUser != null)
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
                await FireDB.connect(req.payload.email, req.payload.password);
                if (FireDB.getAuth() != null)
                    if (FireDB.getAuth().auth().currentUser != null)
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