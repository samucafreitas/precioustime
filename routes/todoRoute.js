const BaseRoute = require('./base/baseRoute');


class TodoRoute extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            method: 'GET',
            path: '/todos',
            handler: (req, headers) => {
                return db.list("QUERY"); //"TODO: LIST todos";
            }
        }
    }

    create() {
        return {
            method: 'POST',
            path: '/todos',
            handler: (req, headers) => {
                return db.create("Foo"); //"TODO: CREATE todos";
            }
        }
    }

    delete() {
        return {
            method: 'delete',
            path: '/todos',
            handler: (req, headers) => {
                return db.delete("ID"); //TODO: DELETE todos";
            }
        }
    }
}

module.exports = TodoRoute;