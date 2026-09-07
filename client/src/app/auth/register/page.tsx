'use client'

import React, { useState } from "react";
import { Register_type } from "@/types/auth_type";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Link from "next/link";
import { Auth_service } from "@/services/auth_service";
import { useRouter } from 'next/navigation';


export default function Register() {
    const objAuth_service: Auth_service = new Auth_service();
    const [registerForm, setRegisterForm] = useState<Register_type>({ firstName: "", lastName: "", email: "", password: "", role: "" });
    const [validated, setValidated] = useState<boolean>(false);
    const router = useRouter();
    const [error, setError] = useState({
        message: "",
        show: false,
    });

    function setValue(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case "firstName":
                setRegisterForm({ ...registerForm, firstName: event.target.value });
                break;
            case "lastName":
                setRegisterForm({ ...registerForm, lastName: event.target.value });
                break;
            case "email":
                setRegisterForm({ ...registerForm, email: event.target.value });
                break;
            case "password":
                setRegisterForm({ ...registerForm, password: event.target.value });
                break;
        }
    }

    async function register(event: any): Promise<void> {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            let success: boolean = false;
            await objAuth_service.Register(registerForm).then(res => success = res);

            if (success) {
                setError({ message: "", show: false });
                router.push("/");
            }
            else {
                setError({
                    message: "Email has exist. Please enter another email",
                    show: true,
                });
            }
        }
    }


    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "50rem" }}>
            <CardTitle className="m-3">Registeration</CardTitle>
            <hr className="m-3" />
            <CardBody>
                <Form noValidate validated={validated}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter first name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter last name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter a valid email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="password" name="password" placeholder="Enter password" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter password.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Stack direction="horizontal" className="justify-content-center mb-2">
                        <Button variant="primary" className="m-1" type="button" onClick={register}>Register</Button>
                        <Link className="btn btn-secondary" href={"/"}>Cancel</Link>
                    </Stack>
                </Form>
                <CardText style={{ display: error.show ? "inline" : "none" }} className="bg-danger hover:bg-danger mt-2 text-white py-1.5 px-2 rounded">
                    {error.message}
                </CardText>
            </CardBody>
        </Card>
    </div>)
}