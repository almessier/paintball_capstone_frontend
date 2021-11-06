import axios from "axios";

const useLogin = () => {
    async function send(values) {
        const response = await axios.post("http://localhost:8000/api/auth/login/", values);
        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
            window.location.reload();
        }
    }

    return send;
}

export default useLogin;