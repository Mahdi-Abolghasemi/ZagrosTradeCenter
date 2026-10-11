'use client'

import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Case_type, resultUploadImg } from '@/types/case_type';
import { Case_service } from '@/services/case_service';
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Figure from 'react-bootstrap/Figure';
import { useSearchParams } from 'next/navigation'


export default function EditCase() {
    const objCase_service: Case_service = new Case_service();
    const [validated, setValidated] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<Case_type>(
        { _id: "", title: "", describe: "", ownerName: "", picturePath: "", address: "", ownerEmail: "", status: "" });
    const router = useRouter();
    const [selectFile, setSelectFile] = useState<File | null>(null);
    const [resUploadImg, setResUploadImg] = useState<resultUploadImg>({ success: false, imgPath: "" });
    const searchParams = useSearchParams();


    useEffect(() => {
        const searchId = searchParams.get('id');
        if (searchId) {
            objCase_service.Get(searchId).then(res => { setEditForm(res), setResUploadImg({ success: true, imgPath: res.picturePath }) });
        }
    }, [])

    async function setValue(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        switch (event.target.name) {
            case "title":
                setEditForm({ ...editForm, title: event.target.value });
                break;
            case "describe":
                setEditForm({ ...editForm, describe: event.target.value });
                break;
            case "selectImage":
                if (event.target.files) {
                    setSelectFile(event.target.files[0]);
                }
                break;
            case "address":
                setEditForm({ ...editForm, address: event.target.value });
                break;
        }
    }

    async function uploadImage(): Promise<void> {
        if (selectFile) {
            await objCase_service.UploadImage(selectFile).then(res => { setResUploadImg(res), setEditForm({ ...editForm, picturePath: res.imgPath }) });
        }
    }

    async function removeUploadFile(): Promise<void> {
        let result: boolean = false;
        await objCase_service.RemoveUploadFile(resUploadImg.imgPath).then(res => result = res);

        if (result) {
            setResUploadImg({ success: false, imgPath: "" });
            setEditForm({ ...editForm, picturePath: "" });
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

            if (resUploadImg.success) {
                let success: boolean = false;
                await objCase_service.Edit(editForm).then(res => success = res);

                if (success) {
                    router.push("/cases/myCase");
                }
            }
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "50rem" }}>
            <CardTitle className="m-3">Edit Case</CardTitle>
            <hr className="m-3" />
            <CardBody>
                <Form noValidate validated={validated}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="title" value={editForm.title} placeholder="Enter title" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter case title.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Describe</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="describe" value={editForm.describe} placeholder="Enter describe" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter case describe.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="text" name="address" value={editForm.address} placeholder="Enter address" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Enter case address.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col style={{ display: resUploadImg.success ? "none" : "inline" }}>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <InputGroup className="shadow mb-3">
                                    <Form.Control type="file" name="selectImage" placeholder="Select image" onChange={setValue} required />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Upload case image.
                                    </Form.Control.Feedback>
                                    <Button variant="primary" onClick={uploadImage}>Upload image</Button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col style={{ display: !resUploadImg.success ? "none" : "inline" }}>
                            <Figure>
                                <Button variant="danger close" className="m-1" type="button" onClick={removeUploadFile}>&times;</Button>
                                <Figure.Image
                                    width={150}
                                    height={150}
                                    alt="150x150"
                                    src={`/uploads/cases/${resUploadImg.imgPath}`}
                                    rounded
                                />
                            </Figure></Col>
                    </Row>
                    <Stack direction="horizontal" className="justify-content-center mb-2">
                        <Button variant="primary" className="m-1" type="button" onClick={save}>Save</Button>
                        <Link className="btn btn-secondary" href={"/cases/myCase"} onClick={removeUploadFile}>Cancel</Link>
                    </Stack>
                </Form>
            </CardBody>
        </Card>
    </div>)
}