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
                return this.db.read("QUERY"); //"TODO: LIST todos";
            }
        }
    }

    create() {
        return {
            method: 'POST',
            path: '/todos',
            handler: (req, headers) => {
                return this.db.create(req.payload); //"TODO: CREATE todos";
            }
        }
    }

    delete() {
        return {
            method: 'DELETE',
            path: '/todos',
            handler: (req, headers) => {
                return this.db.delete("ID"); //TODO: DELETE todos";
            }
        }
    }
}

module.exports = TodoRoute;