import hostMixin from './hostMixin'

const getPhotos = async function (data, api) {
    console.log('api connecting');
    return new Promise(async (resolve, reject) => {
        const response = await fetch(hostMixin.host + "/api/"+api, {
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

export default {
    loadPhotos(data,api) {
        return getPhotos(data,api);
    }
}