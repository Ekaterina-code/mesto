export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserInfo() {
        return this._sendRequest("users/me", 'GET')
            .then(this._toUserInfo);
    }

    getInitialCards() {
        return this._sendRequest("cards", 'GET')
            .then(res => res.map(this._toCardInfo.bind(this)).reverse());
    }

    setUserInfo(userInfo) {
        const body = JSON.stringify({
            name: userInfo.name,
            about: userInfo.info
        });
        return this._sendRequest("users/me", 'PATCH', body)
            .then(this._toUserInfo);
    }

    setUserAvatar(url) {
        const body = JSON.stringify({
            avatar: url
        });
        return this._sendRequest("users/me/avatar", 'PATCH', body);
    }

    addCard(cardInfo) {
        const body = JSON.stringify({
            name: cardInfo.name,
            link: cardInfo.link
        });
        return this._sendRequest("cards", 'POST', body)
            .then(this._toCardInfo.bind(this));
    }

    setCardLikeState(cardId, likeState) {
        const method = likeState ? 'PUT' : 'DELETE';
        return this._sendRequest(`cards/likes/${cardId}`, method)
            .then(this._getLikeUserIds.bind(this));
    }

    removeCard(cardId) {
        return this._sendRequest(`cards/${cardId}`, 'DELETE');
    }

    _toUserInfo(res) {
        return {
            _id: res._id,
            name: res.name,
            info: res.about,
            avatar: res.avatar,
        };
    }

    _toCardInfo(res) {
        return {
            _id: res._id,
            name: res.name,
            link: res.link,
            ownerId: res.owner._id,
            likes: this._getLikeUserIds(res),
        }
    }

    _getLikeUserIds(res) {
        return res.likes.map(like => like._id)
    }

    _sendRequest(path, method, body) {
        return fetch(
            `${this.baseUrl}/${path}`,
            {
                headers: this.headers,
                method: method,
                body: body
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}