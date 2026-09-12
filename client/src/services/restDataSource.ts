import Axios from "axios";
import Cookies, { Cookie } from "universal-cookie";

export class restDataSource<T, U> {
    private url: string;
    private cookie: Cookie;
    private token: string;

    constructor(controllerName: string) {
        this.url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_ADDRESS}/${controllerName}`;
        this.cookie = new Cookies();
        this.token = this.cookie.get("TOKEN") !== "" ? this.cookie.get("TOKEN") : "";
    }

    async Registration(_data: T): Promise<U> {
        let result: U = <U>{};
        await Axios.request({ method: "post", headers: { 'Content-Type': 'application/json' }, url: this.url + "/registration", data: _data }).then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
        return result;
    }

    async Login(_data: T): Promise<U> {
        let result: U = <U>{};
        await Axios.request({ method: "post", headers: { 'Content-Type': 'application/json' }, url: this.url + "/logIn", data: _data }).then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
        return result;
    }

    async ChangePassword(_data: T): Promise<boolean> {
        let result: boolean = false;
        await Axios.request({ method: "put", headers: !this.token ? {} : { Authorization: this.token }, url: this.url + "/changePassword", data: _data }).then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
        return result;
    }

    async Edit(_data: T): Promise<boolean> {
        let result: boolean = false;
        await Axios.request({ method: "put", headers: !this.token ? {} : { Authorization: this.token }, url: this.url + "/editProfile", data: _data }).then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
        return result;
    }

    async Get(email: T): Promise<U> {
        let result: U = <U>{};
        await Axios.request({ method: "post", headers: !this.token ? {} : { Authorization: this.token }, url: this.url + "/getProfile", data: { "email": email } }).then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
        return result;
    }

    // private async SendRequest(_method: string, _url: string, _data?: T): Promise<boolean> {
    //     let result: boolean = false;
    //     await Axios.request({ method: _method, headers: !this.token ? {} : { Authorization: this.token }, url: _url, data: _data })
    //         .then(res => result = res.data).catch((ex: unknown) => { console.log(`error is: ${ex}`) });
    //     return result
    // }
}