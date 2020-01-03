import api from './api'

export default async () => {
    return new Promise(async resolve => {
        const auth = await api.post({auth: localStorage.auth}, 'auth');
        if (auth.auth) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};