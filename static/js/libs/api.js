import Network from './network';

/**
 * Класс предоставляет возможность работы с API
 */
export default class Api {
    /**
     * Отправляет запрос на логин на сервер
     * @param {string} login
     * @param {string} password
     * @return {Promise<Response>}
     */
    static doLogin(login, password) {
        return Network.doPost({
            url: '/login',
            body: {
                'Username': login,
                'Password': password,
            },
        });
    }

    /**
     * Отправляет запрос на регистрацию
     * @param {string} login
     * @param {string} email
     * @param {string} password
     * @return {Promise<Response>}
     */
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

    /**
     * Выполняет запрос на получения данных о пользователе
     * @return {Promise<Response>}
     */
    static getUserData() {
        return Network.doGet({
            url: '/user',
        });
    }

    /**
     * Выполняет запрос на обновление данных пользователя
     * @param {string} login
     * @param {string} email
     * @param {string} password
     * @return {Promise<Response>}
     */
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

    /**
     * Выполняет запрос на загрузку картинки на сервер
     * @param {object} formData
     * @return {Promise<Response>}
     */
    static uploadImage(formData) {
        return Network.doPut({
            url: '/user/image',
            formData: formData,
        });
    }
}