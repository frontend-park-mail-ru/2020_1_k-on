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
    static doLogin({
        login = '',
        password = '',
    }) {
        return Network.doPost({
            url: '/login',
            body: JSON.stringify({
                'username': login,
                'password': password,
            }),
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
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
    static doSignUp({
        login= '',
        email = '',
        password = '',
    }) {
        return Network.doPost({
            url: '/signup',
            body: JSON.stringify({
                'username': login,
                'password': password,
                'email': email,
            }),
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
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
     * Выполняет запрос на получения данных страницы index
     * @return {Promise<Response>}
     */
    static getSlider() {
        return Network.doGet();
    }

    static getIndex() {
        return Network.doGet({
            url: '/index',
        });
    }

    /**
     * Выполняет запрос на обновление данных пользователя
     * @param {string} login
     * @param {string} email
     * @param {string} password
     * @return {Promise<Response>}
     */
    static updateUser({login = '', email = '', password = ''} = {}) {
        return Network.doPut({
            url: '/user',
            body: JSON.stringify({
                'username': login,
                'password': password,
                'email': email,
            }),
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Выполняет запрос на загрузку картинки на сервер
     * @param {FormData} formData
     * @return {Promise<Response>}
     */
    static uploadUserAvatar(formData) {
        return Network.doPost({
            url: '/user/image',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
            },
        });
    }

    static doLogout() {
        return Network.doDelete({
            url: '/logout',
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
            },
        });
    }

    static getFilters(type) {
        return Network.doGet({
            url: `/${type}/filter`,
        });
    }

    static getList(type, filters, page) {
        const filtersArray = Object.keys(filters).map((key) => {
            return `${key}=${filters[key].reference}`;
        });
        filtersArray.push(`page=${page}`);
        return Network.doGet({
            url: `/${type}?${filtersArray.join('&')}`,
        });
    }

    static getMovie(type, id) {
        return Network.doGet({
            url: `/${type}/${id}`,
        });
    }

    static getReviews(type, id) {
        return Network.doGet({
            url: `/${type}/${id}/reviews`,
        });
    }

    static getUserReview(type, id) {
        return Network.doGet({
            url: `/${type}/${id}/reviews/user`,
        });
    }

    static createReview(type, id, rate, text) {
        return Network.doPost({
            url: `/${type}/${id}/reviews`,
            body: JSON.stringify({
                'rating': parseFloat(rate),
                'body': text,
            }),
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
            },
        });
    }

    static getPerson(id) {
        return Network.doGet({
            url: `/persons/${id}`,
        });
    }

    static getUserPlaylists() {
        return Network.doGet({
            url: '/playlist',
        });
    }

    static createPlaylist(name = '', isPublic = true) {
        return Network.doPost({
            url: '/playlist',
            body: JSON.stringify({
                name: name,
                public: isPublic,
            }),
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
            },
        });
    }

    static deletePlaylist(id) {
        return Network.doDelete({
            url: `/playlist/${id}`,
        });
    }

    static getPlaylistContent(id) {
        return Network.doGet({
            url: `/playlist/${id}`,
        });
    }

    static deleteCardFromPlaylist(pid, cid, type) {
        return Network.doDelete({
            url: `/playlist/${pid}/${type}/${cid}`,
        });
    }

    static getSubscriptions() {
        return Network.doGet({
            url: '/subscriptions',
        });
    }

    static subscribeToPlaylist(pid) {
        return Network.doPost({
            url: `/subscribe/${pid}`,
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
                'Content-Type': 'application/json',
            },
        });
    }

    static unsubscribeFromPlaylist(pid) {
        return Network.doDelete({
            url: `/unsubscribe/${pid}`,
            headers: {
                'X-CSRF-TOKEN': Network.getCookie('X-CSRF-TOKEN'),
            },
        });
    }
}
