class XHR {
    get(url) {
        return new Promise((resolve, reject) => {
            this.s = 0; // this code is useless, but eslint required a this must be used.
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
                        // JSON.parse(arr) will be mistaked if arr is undeinfed;
                        if (xhr.responseText) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(`XHR unsuccessful:${xhr.status}`);
                    }
                }
            };
            xhr.open('get', url, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(null);
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.s = 0; // this code is useless, but eslint required a this must be used.
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(`XHR unsuccessful:${xhr.status}`);
                    }
                }
            };
            xhr.open('post', url, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        });
    }
}

XHR.install = (Vue) => {
    Vue.prototype.$get = new XHR().get;
    Vue.prototype.$post = new XHR().post;
};

export default XHR;