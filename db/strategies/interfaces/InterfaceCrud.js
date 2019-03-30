class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
}

class ICrud {
    constructor() {
        
    }

    read(query) {
        throw new NotImplementedException();
    }

    create(item) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}

exports.module = ICrud;