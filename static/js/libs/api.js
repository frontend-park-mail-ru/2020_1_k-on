import Network from './network';

export default class Api {
    static doLogin(login, password) {
        return Network.doPost({
            url: '/login',
            body: {
                'Username': login,
                'Password': password,
            },
        });
    }

    static doSignUp(login, email, password) {
        return Network.doPost({
            url: '/signup',
            body: {
                'Username': login,
                'Password': password,
                'Email': email,
            },
        });
    }

    static getUserData() {
        return Network.doGet({
            url: '/user',
        });
    }

    static updateUser(login, email, password) {
        return Network.doPost({
            url: '/user',
            body: {
                'Username': login,
                'Password': password,
                'Email': email,
            },
        });
    }

    static uploadImage(formData) {
        return Network.doPut({
            url: '/user/image',
            formData: formData,
        });
    }
}
