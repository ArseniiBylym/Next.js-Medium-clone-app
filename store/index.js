import {action, observable, reaction} from 'mobx';
import {useStaticRendering} from 'mobx-react';
import API from '../api'

const isServer = !process.browser
useStaticRendering(isServer);

class Store {
    @observable user = null;
    @observable userFetched = false;
    @observable message = {
        text: '',
        open: false,
        type: '',
    }

    constructor(initialData = {}) {
        this.user = initialData.user || null;
        this.userFetched = initialData.userFetched || false;
    }

    @action showMessage = ({text, type = 'success', dellay = 0}) => {
        setTimeout(() => {
            this.message = {
                text,
                type,
                open: true
            }
            setTimeout(() => {
                this.hideMessage();
            }, 5000)
        }, dellay)
    } 

    @action hideMessage = () => {
        this.message.open = false
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

    isAlreadyLiked = articleId => {
        if (!this.user || !this.user.likes) return false;
        const article = this.user.likes.find(item => item._id === articleId)
        return !!article;
    } 

    @action likeArticle = ({_id, title, subTitle, image, createdAt}) => {
        this.user.likes.push({_id, title, subTitle, image, createdAt})
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
