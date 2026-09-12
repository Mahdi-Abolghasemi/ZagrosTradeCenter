'use client'

import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
            <Navbar expand="lg" bg="dark">
                <Container>
                    <Navbar.Brand href="/" className="text-white">Zagros Trade Center</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="text-white">List of case</Nav.Link>
                            <Nav.Link href="/auth/login" className="text-white">Login</Nav.Link>
                            <Nav.Link href="/auth/register" className="text-white">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar expand="lg" bg="dark">
                <Container>
                    <Navbar.Brand href="/" className="text-white">Zagros Trade Center</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="text-white">List of case</Nav.Link>
                            <NavDropdown title={<span className="text-white my-auto">Profile</span>} id="basic-nav-dropdown" data-bs-theme="dark">
                                <NavDropdown.Item href="/auth/changePassword" className="text-white">Change password</NavDropdown.Item>
                                <NavDropdown.Item href="/auth/editProfile" className="text-white">
                                    Edit profile
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/" onClick={logout} className="text-white">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}