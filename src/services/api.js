const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const res = await fetch(host + url, options);
        if (res.ok === false) {
            if (res.status === 403) {
                localStorage.removeItem('user');
            }
            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status === 204) {
            return res;
        } else {
            return res.json();
        }

    } catch (error) {
        // window.alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const patch = request.bind(null, 'patch');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    patch,
    del
}