import hostMixin from './hostMixin'

const jsonRequest = async function (data, api, method = 'POST') {
    console.log('JSON request to ' + hostMixin.host + "/api/" + api);
    return new Promise(async (resolve, reject) => {
        const response = await fetch(hostMixin.host + "/api/" + api, {
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if (json) {
            resolve(json);
        } else {
            reject();
        }
    });
};

const postFormRequest = async (formData,api) => {
    const url = hostMixin.host + "/api/" + api;
    console.log('FORM request to ' + url);
    return new Promise(async (resolve) => {
        const request = new Request(url, {
            method: 'POST',
            body: formData
        });
        fetch(request).then(response => {
            response.json().then(r => {
                resolve(r);
            });
        });
    });
};

export default {
    post(data, api) {
        return jsonRequest(data, api);
    },
    upload(form,api) {
        return postFormRequest(form,api);
    },
    get(data, api) {
        return jsonRequest(data, api, 'GET');
    }
}