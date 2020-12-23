import {objFetchByKey} from '~/Framework/Helpers';

export default class Cache {

    static storage = {};

    static set(name, value) {

        this.storage[name] = value;

    }

    static get(name) {

        return this.storage[name] || null;

    }

    static has(name) {

        return this.storage[name] ? true : false;

    }

    static getItem(name, key, value) {

        if(!this.storage[name]) {
            return false;
        }

        return objFetchByKey(this.storage[name], key, value);

    }

    static hasItem(name, key, value) {
        return !!objFetchByKey(this.storage[name], key, value);
    }

    static setItem(name, value) {

        if(!this.storage[name]) {
            this.storage[name] = [];
        }

        this.storage[name].push(value);

    }

}