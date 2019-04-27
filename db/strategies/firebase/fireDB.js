const firebase = require("firebase");
const ICrud = require("../interfaces/InterfaceCrud");

const mapTodos = (items) => {
    return items.map(item => item);
}

class FireDB extends ICrud {
    constructor(connection) {
        super();
        this._connection = connection;
        this._user = null;// = this._connection.auth().currentUser;
        this._auth = null;// = this._connection.auth();
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

    login(email, password) {
        this._connection.auth().setPersistence(this._connection.auth.Auth.Persistence.LOCAL)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return this._connection.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });

        /*this._connection.auth().signInWithEmailAndPassword(email, password)
        .then(
            (auth) => {
                this._user = auth.user;
                return this._user;
            }
        ).catch((err) => console.error('[ERROR] Login -> ', err));*/

        return null;
    }

    getCurrentUser() {
        console.log(this._connection.auth().currentUser)
        return this._connection.auth().currentUser;
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