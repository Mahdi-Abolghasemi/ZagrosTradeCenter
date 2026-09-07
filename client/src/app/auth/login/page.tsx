'use client'

import React, { useState } from "react";
import { Login_type } from "@/types/auth_type";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";
import { Auth_service } from "@/services/auth_service";
import { useRouter } from 'next/navigation';

export default function Login() {
    const objAuth_service: Auth_service = new Auth_service();
    const [loginForm, setLoginForm] = useState<Login_type>({ userName: "", password: "" });
    const [validated, setValidated] = useState<boolean>(false);
    const router = useRouter();
    const [error, setError] = useState({
        message: "",
        show: false,
    });

    function setValue(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case "email":
                setLoginForm({ ...loginForm, userName: event.target.value });
                break;
            case "password":
                setLoginForm({ ...loginForm, password: event.target.value });
                break;
        }
    }

    async function login(event: any): Promise<void> {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            let success: boolean = false;
            await objAuth_service.Login(loginForm).then(res => success = res);

            if (success) {
                setError({ message: "", show: false });
                router.push("/");
            }
            else {
                setError({
                    message: "User name or password is not correct.",
                    show: true,
                });
            }
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "25rem" }}>
            <CardTitle className="m-3">Login</CardTitle>
            <hr className="m-3" />
            <CardBody>
                <Form noValidate validated={validated}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="shadow mb-3">
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={setValue} required />
                            <Form.Control.Feedback type="invalid" tooltip>
                                Enter a valid email.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="shadow mb-3">
                            <Form.Control type="password" name="password" placeholder="Enter password" onChange={setValue} required />
                            <Form.Control.Feedback type="invalid" tooltip>Enter a password</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={login}>Login</Button>
                </Form>
                <CardText style={{ display: error.show ? "inline" : "none" }} className="bg-danger hover:bg-danger mt-2 text-white py-1.5 px-2 rounded">
                    {error.message}
                </CardText>
            </CardBody>
        </Card>
    </div>)
}