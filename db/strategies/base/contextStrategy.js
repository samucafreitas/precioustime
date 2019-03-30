
const ICrud = require('../interfaces/InterfaceCrud');

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        return this._database = strategy;
    }

    read(query) {
        return this._database.read(query);
    }

    create(item) {
        return this._database.create(item);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }
}

module.exports = ContextStrategy;