import {SERVER_ADDRESS} from './constants';

export default class Network {
    static doGet({host = SERVER_ADDRESS, url = '/'} = {}) {
        return fetch(host + url, {
            method: 'GET',
            credentials: 'include',
        });
    }

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

    static doPut({host = SERVER_ADDRESS, url = '/', formData = null} = {}) {
        return fetch(host + url, {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });
    }
}
