import Link from "next/link";

export default function Header() {
    return (
        <div className="bodyHeader bg-dark">
            <h5>
                <Link className="m-2 text-white text-decoration-none" href={"/"}>Home</Link>
                <Link className="m-2 text-white text-decoration-none" href={"/"}>List of case</Link>
                <Link className="m-2 text-white text-decoration-none" href={"/"}>Login / Register</Link>
            </h5>
        </div>
    )
}