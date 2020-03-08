import {SERVER_ADDRESS} from './constants';

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
     * @param {string} body
     * @return {Promise<Response>}
     */
    static doPost({host = SERVER_ADDRESS, url = '/', body = {}} = {}) {
        return fetch(host + url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    /**
     * Выполняет PUT запрос
     * @param {string} host
     * @param {string} url
     * @param {string} formData
     * @return {Promise<Response>}
     */
    static doPut({host = SERVER_ADDRESS, url = '/', formData = null} = {}) {
        return fetch(host + url, {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });
    }

    static doDelete({host = SERVER_ADDRESS, url = '/'} = {}) {
        return fetch(host + url, {
            method: 'DELETE',
            credentials: 'include',
        });
    }
}
