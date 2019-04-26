import {action, observable} from 'mobx';
import {useStaticRendering} from 'mobx-react';
import API from '../api'

const isServer = !process.browser
useStaticRendering(isServer);

class Store {
    @observable user = null;
    @observable userFetched = false;

    constructor(initialData = {}) {
        this.user = initialData.user || null;
        this.userFetched = initialData.userFetched || false;
    }

    @action getSession = async () => {
        const {data, status} = await API.GET('/api/auth/session');
        console.log(status)
        if (status < 300) {
            console.log(data);
            this.user = data;
        }
        this.userFetched = true;
    }

    @action setUser = (user) => {
        this.user = user;
    }
}

let store = null;

export function initializeStore(initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return new Store(initialData);
    }
    if (store === null) {
        store = new Store(initialData);
    }
    return store;
}
