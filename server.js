'use strict';

const Hapi = require('hapi');
const Pug = require('pug');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (_, h) => h.view('index')
});

const init = async () => {
    try {
        await server.register(require('vision'));
        await server.register(require('inert'));

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