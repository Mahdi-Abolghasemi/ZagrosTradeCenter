'use client'

import Link from "next/link";
import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation';

export default function Header() {
    const cookie: Cookie = new Cookies();
    const router = useRouter();
    let token: string = cookie.get("TOKEN");

    async function logout() {
        await cookie.remove("TOKEN", { path: "/" });
        token = "";
        router.push("/");
    }

    if (!token) {
        return (
            <div className="bodyHeader bg-dark">
                <h5>
                    <Link className="m-2 text-white text-decoration-none" href={"/"}>Home</Link>
                    <Link className="m-2 text-white text-decoration-none" href={"/"}>List of case</Link>
                    <Link className="m-2 text-white text-decoration-none" href={"/auth/login"}>Login</Link>
                    <Link className="m-2 text-white text-decoration-none" href={"/auth/register"}>Register</Link>
                </h5>
            </div>
        )
    }
    else {
        return (
            <div className="bodyHeader bg-dark">
                <h5>
                    <Link className="m-2 text-white text-decoration-none" href={"/"}>Home</Link>
                    <Link className="m-2 text-white text-decoration-none" href={"/"}>List of case</Link>
                    <Link className="m-2 text-white text-decoration-none" href={"/"} onClick={logout}>Logout</Link>
                </h5>
            </div>
        )
    }
}