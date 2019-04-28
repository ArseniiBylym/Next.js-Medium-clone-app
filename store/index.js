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
        if (status < 300) {
            this.user = data;
        }
        this.userFetched = true;
    }

    @action setUser = (user) => {
        this.user = user;
    }

    isCurrentUserOwner = (authorId) => {
        if (!this.user) return false;
        if (authorId !== this.user._id) return false;
        return true;
    }

    isFollowed = (profileUser) => {
        const isFollowed = profileUser.followers.find(item => item._id === this.user._id)
        return !!isFollowed;
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
