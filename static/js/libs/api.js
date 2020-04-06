import Network from 'libs/network';

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
                'username': login,
                'password': password,
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
                'username': login,
                'password': password,
                'email': email,
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
    static updateUser(login = '', email= '', password = '') {
        return Network.doPut({
            url: '/user',
            body: JSON.stringify({
                'username': login,
                'password': password,
                'email': email,
            }),
        });
    }

    /**
     * Выполняет запрос на загрузку картинки на сервер
     * @param {object} formData
     * @return {Promise<Response>}
     */
    static uploadUserAvatar(formData) {
        return Network.doPut({
            url: '/user',
            body: formData,
        });
    }

    static doLogout() {
        return Network.doDelete({
            url: '/logout',
        });
    }

    static getFilters(type) {
        return Network.doGet({
            url: `/${type}/filters`,
        });
    }

    static getList(type, params) {
        const filtersString = Object.keys(params)
            .map((key) => (`${key}=${params[key]}`)).join('&');
        return Network.doGet({
            url: `/${type}?${filtersString}`,
        });
    }
}
