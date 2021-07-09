import $api from "@/http";

export default class AuthService {
    static async signup(email, password) {
        return $api.post('auth/signup', {
            email: email,
            password: password
        });
    }

    static async signin(email, password) {
        return $api.post('auth/signin', {
            email: email,
            password: password
        });
    }

    static async signout() {
        return $api.post('auth/signout');
    }
}