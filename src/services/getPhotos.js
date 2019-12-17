const getPhotos = async function(data) {
    console.log('api connecting');
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://kaller.test"+"/api/photos", {
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
    loadPhotos (data){
        return getPhotos(data);
    }
}