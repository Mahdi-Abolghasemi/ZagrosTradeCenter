'use client'

import React, { useState, useEffect } from "react";
import { Register_type } from "@/types/auth_type";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Link from "next/link";
import { Auth_service } from "@/services/auth_service";
import { useRouter } from 'next/navigation';


export default function EditProfile() {
    const objAuth_service: Auth_service = new Auth_service();
    const [editForm, setEditForm] = useState<Register_type>({ firstName: "", lastName: "", email: "", password: "", role: "" });
    const [validated, setValidated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        objAuth_service.GetProfile().then(res => setEditForm({ ...editForm, firstName: res.firstName, lastName: res.lastName, email: res.email }));
    }, [])

    function setValue(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case "firstName":
                setEditForm({ ...editForm, firstName: event.target.value });
                break;
            case "lastName":
                setEditForm({ ...editForm, lastName: event.target.value });
                break;
        }
    }

    async function save(event: any): Promise<void> {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            let success: boolean = false;
            await objAuth_service.EditProfile(editForm).then(res => success = res);

            if (success) {
                router.push("/");
            }
        }
    }


    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "50rem" }}>
            <CardTitle className="m-3">Edit profile</CardTitle>
            <hr className="m-3" />
            <CardBody>
                <Form noValidate validated={validated}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="firstName" placeholder="Enter first name" value={editForm.firstName} onChange={setValue} required />
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
                                    <Form.Control type="text" name="lastName" placeholder="Enter last name" value={editForm.lastName} onChange={setValue} required />
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
                                <Form.Label>Email:</Form.Label>
                                <Form.Label>{editForm.email}</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Stack direction="horizontal" className="justify-content-center mb-2">
                        <Button variant="primary" className="m-1" type="button" onClick={save}>Save</Button>
                        <Link className="btn btn-secondary" href={"/"}>Cancel</Link>
                    </Stack>
                </Form>
            </CardBody>
        </Card>
    </div>)
}