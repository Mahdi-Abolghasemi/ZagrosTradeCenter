'use client'

import Cookies, { Cookie } from "universal-cookie";
import Login from "./login/page";
import { usePathname } from "next/navigation";


function ProtectedRoutes({ children }: any) {
    const cookie: Cookie = new Cookies();
    const token: string = cookie.get("TOKEN");
    const pathname = usePathname();

    const url: string[] = ["/auth/changePassword", "/auth/editProfile"];

    if (url.includes(pathname)) {
        if (token) {
            return children;
        } else {
            return (
                <Login />
            );
        }
    } else {
        return children;
    }
}

export default ProtectedRoutes;