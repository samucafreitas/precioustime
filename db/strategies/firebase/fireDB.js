const firebase = require("firebase");
const ICrud = require("../interfaces/InterfaceCrud");

const mapTodos = (items) => {
    return items.map(item => item);
}

class FireDB extends ICrud {
    constructor(connection) {
        super();
        this._connection = connection;
        this._user = null;
    }

    static connect() {
        const config = {
            apiKey: "AIzaSyBlXpKwtYx6g915UGHZnhcwaw_lmANRaww",
            authDomain: "precioustime.firebaseapp.com",
            databaseURL: "https://precioustime.firebaseio.com",
            projectId: "precioustime",
            storageBucket: "precioustime.appspot.com",
            messagingSenderId: "293403936313"
        };
        firebase.initializeApp(config);

        return firebase;
    }

    async login(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage);

            // TODO: handle erros
        });

        this._connection.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user is logged', user.email);
                this._user = user;
            } else {
                this._user = null;
            }
        });
    }
   
    getCurrentUser() {
        return this._user;
    }

    read() {
        var todos = this._connection.database()
            .ref(this._connection.auth().currentUser.uid)
            .once('value')
            .then((snap) => snap.val());
        return todos;
    }

    create(items) {
        var todosRef = this._connection.database().ref(this._connection.auth().currentUser.uid);
        var now = new Date();
        var actualDate = ('0' + (now.getDate())).slice(-2) + ('0' + (now.getMonth() + 1)).slice(-2) + now.getFullYear();

        // Computed property names (ES2015)
        var tree = {
            [actualDate]: {
                todos: {
                    ...mapTodos(items)
                }
            }
        };

        todosRef.update(tree);

        return items;
    }
}

module.exports = FireDB;