'use strict';

const Hapi = require('hapi');
const Pug = require('pug');

const MainRoute = require('./routes/mainRoute');
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

const init = async () => {
    try {
        await server.register(require('vision'));
        await server.register(require('inert'));

        const connection = FireDB.connect();
        const db = new FireDB(connection);
        const ContextFireDB = new ContextStrategy(db);

        server.route([
            ...mapRoute(new TodoRoute(ContextFireDB), TodoRoute.methods()),
            ...mapRoute(new MainRoute(db), MainRoute.methods())
        ]);

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