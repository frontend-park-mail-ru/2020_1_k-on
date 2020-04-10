import {SERVER_ADDRESS} from 'libs/constants';

/**
 * Класс для работы с сетевыми запросами
 */
export default class Network {
    /**
     * Выполняет GET запрос
     * @param {string} host
     * @param {string} url
     * @return {Promise<Response>}
     */
    static doGet({host = SERVER_ADDRESS, url = '/'} = {}) {
        return fetch(host + url, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
     * Выполняет POST запрос
     * @param {string} host
     * @param {string} url
     * @param {FormData | string} body
     * @param {object} headers
     * @return {Promise<Response>}
     */
    static doPost({host = SERVER_ADDRESS,
        url = '/',
        body = '',
        headers = {},
    } = {}) {
        return fetch(host + url, {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: body,
        });
    }

    /**
     * Выполняет PUT запрос
     * @param {string} host
     * @param {string} url
     * @param {object} body
     * @param {object} headers
     * @return {Promise<Response>}
     */
    static doPut({
        host = SERVER_ADDRESS,
        url = '/',
        body = {},
        headers = {},
    } = {}) {
        return fetch(host + url, {
            method: 'PUT',
            credentials: 'include',
            headers: headers,
            body: body,
        });
    }

    /**
     * Выполняет DELETE запрос
     * @param {string} host
     * @param {string} url
     * @param {object} headers
     * @return {Promise<Response>}
     */
    static doDelete({
        host = SERVER_ADDRESS,
        url = '/',
        headers = {},
    } = {}) {
        return fetch(host + url, {
            method: 'DELETE',
            credentials: 'include',
            headers: headers,
        });
    }

    /**
     * Получает cookie по наименованию
     * @param {string} name
     * @return {string}
     */
    static getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : '';
    }
}
