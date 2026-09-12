'use client'

import React, { useState } from "react";
import { UserPassword_type } from "@/types/auth_type";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";
import { Auth_service } from "@/services/auth_service";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Cookies, { Cookie } from "universal-cookie";


export default function ChangePassword() {
    const objAuth_service: Auth_service = new Auth_service();
    const [userPassword, setUserPassword] = useState<UserPassword_type>({ email: "", oldPassword: "", newPassword: "" });
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [validated, setValidated] = useState<boolean>(false);
    const router = useRouter();
    const [error, setError] = useState({
        message: "",
        show: false,
    });
    const cookie: Cookie = new Cookies();
    const userName: string = cookie.get("USER_NAME");


    function setValue(event: React.ChangeEvent<HTMLInputElement>): void {
        switch (event.target.name) {
            case "oldPassword":
                setUserPassword({ ...userPassword, oldPassword: event.target.value });
                break;
            case "newPassword":
                setUserPassword({ ...userPassword, newPassword: event.target.value });
                break;
            case "repeatNewPassword":
                setRepeatPassword(event.target.value);
                break;
        }
    }

    async function changePassword(event: any): Promise<void> {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            let success: boolean = false;
            if (userPassword.newPassword === repeatPassword) {
                setError({ message: "", show: false });
                await objAuth_service.ChangePassword(userPassword).then(res => success = res);
            }
            else {
                setError({
                    message: "New password with repeat password is not same.",
                    show: true,
                });
            }

            if (success) {
                setError({ message: "", show: false });
                router.push("/");
            }
            else {
                setError({
                    message: "Password is not correct.",
                    show: true,
                });
            }
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "25rem" }}>
            <CardTitle className="m-3">Changing password</CardTitle>
            <hr className="m-3" />
            <CardBody>
                <Form noValidate validated={validated}>
                    <Form.Group>
                        <Form.Label>User Name:</Form.Label>
                        <Form.Label>{userName}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Old password</Form.Label>
                        <InputGroup className="shadow mb-3">
                            <Form.Control type="password" name="oldPassword" placeholder="Enter old password" onChange={setValue} required />
                            <Form.Control.Feedback type="invalid" tooltip>Enter old password</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New password</Form.Label>
                        <InputGroup className="shadow mb-3">
                            <Form.Control type="password" name="newPassword" placeholder="Enter new password" onChange={setValue} required />
                            <Form.Control.Feedback type="invalid" tooltip>Enter new password</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repeat new password</Form.Label>
                        <InputGroup className="shadow mb-3">
                            <Form.Control type="password" name="repeatNewPassword" placeholder="Enter new password again" onChange={setValue} required />
                            <Form.Control.Feedback type="invalid" tooltip>Enter new password again</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" className="m-1" type="button" onClick={changePassword}>Change password</Button>
                    <Link className="btn btn-secondary" href={"/"}>Cancel</Link>
                </Form>
                <CardText style={{ display: error.show ? "inline" : "none" }} className="bg-danger hover:bg-danger mt-2 text-white py-1.5 px-2 rounded">
                    {error.message}
                </CardText>
            </CardBody>
        </Card>
    </div>)
}