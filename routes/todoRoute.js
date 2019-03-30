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
                return "TODO: LIST todos";
            }
        }
    }

    create() {
        return {
            method: 'POST',
            path: '/todos',
            handler: (req, headers) => {
                return "TODO: CREATE todos";
            }
        }
    }

    delete() {
        return {
            method: 'delete',
            path: '/todos',
            handler: (req, headers) => {
                return "TODO: DELETE todos";
            }
        }
    }
}

module.exports = TodoRoute;