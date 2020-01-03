import hostMixin from './hostMixin'

const postJSONRequest = async function (data, api) {
    console.log('JSON request to ' + hostMixin.host + "/api/" + api);
    return new Promise(async (resolve, reject) => {
        const response = await fetch(hostMixin.host + "/api/" + api, {
            method: "POST",
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
        return postJSONRequest(data, api);
    },
    upload(form,api) {
        return postFormRequest(form,api);
    }
}