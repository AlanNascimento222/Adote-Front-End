import axios from 'axios'

const api = axios.create({
    baseURL: "https://adote-back-end.onrender.com",
});

async function login(credentials) {
    try {
        const { password, email } = credentials
        const response = await api.post('/usuario', {
            password: password,
            email: email
        })
        localStorage.setItem('authorization', response.data.token)
        if (!response) {
            throw "Erro na requisição"
        }
        return response.data
    } catch(err) {
        return err
    }
}

export { login } 