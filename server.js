'use strict';

const Hapi = require('hapi');
const Pug = require('pug');
const TodoRoute = require('./routes/todoRoute');

const ContextStrategy = require('./db/strategies/base/contextStrategy');
const FireDB = require('./db/strategies/firebase/fireDB');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const mapRoute = (instance, methods) => { 
    return methods.map(method => instance[method]());
}

server.route({
    method: 'GET',
    path: '/',
    handler: (_, h) => h.view('index')
});

const init = async () => {
    try {
        await server.register(require('vision'));
        await server.register(require('inert'));

        const connection = FireDB.connect();
        const ContextFireDB = new ContextStrategy(new FireDB(connection));

        server.route([
            ...mapRoute(new TodoRoute(ContextFireDB), TodoRoute.methods())
        ]);

        server.route({
            method: 'GET',
            path: '/js/{file*}',
            handler: {
                directory: {
                    path: 'public/js',
                    listing: true
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/css/{file*}',
            handler: {
                directory: {
                    path: 'public/css',
                    listing: true
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/{path*}',
            handler: (_, h) => h.view('404')
        });

        server.views({
            engines: {
                pug: Pug
            },
            relativeTo: __dirname,
            path: 'templates',
            helpersPath: 'helpers'
        })

        console.log(`Server running at: ${server.info.uri}`);
        server.start()
    } catch(err) {
        console.error('[ERROR]', err);
    }
}

init();