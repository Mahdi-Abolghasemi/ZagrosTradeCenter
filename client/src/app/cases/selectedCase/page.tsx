'use client'

import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Case_type } from '@/types/case_type';
import { Case_service } from '@/services/case_service';
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Link from "next/link";
import Figure from 'react-bootstrap/Figure';
import { useSearchParams } from 'next/navigation';
import { Favority_service } from '@/services/favority_service';
import { Session_service } from '@/services/session_service';


export default function SelectedCase() {
    const searchParams = useSearchParams();
    const objCase_service: Case_service = new Case_service();
    const objFavority_service: Favority_service = new Favority_service();
    const objsession_service: Session_service = new Session_service();
    const [form, setForm] = useState<Case_type>(
        { _id: "", title: "", describe: "", ownerName: "", picturePath: "", address: "", ownerEmail: "", status: "" });

    useEffect(() => {
        const searchId = searchParams.get('id');
        if (searchId) {
            objCase_service.Get(searchId).then(res => setForm(res));
        }
    }, []);

    async function setFavority(): Promise<void> {
        objFavority_service.Add(form._id);
    }

    async function setSession(): Promise<void> {
        objsession_service.Add(form._id);
    }

    return (<div className="bodyHome bg-info-subtle">
        <Card className="shadow" style={{ width: "50rem" }}>
            <Row>
                <Col className='d-flex justify-content-start m-3'>
                    <CardTitle>{form.title}</CardTitle>
                </Col>
                <Col className='d-flex justify-content-end m-3'>
                    <Link className="btn btn-danger close" href={"/cases"}>&times;</Link>
                </Col>
            </Row>
            <hr className="m-3" />
            <CardBody>
                <Row>
                    <Col className='m-3'>
                        <Figure>
                            <Figure.Image
                                width={350}
                                height={250}
                                alt="350x250"
                                src={`/uploads/cases/${form.picturePath}`}
                                rounded
                            />
                        </Figure>
                    </Col>
                    <Col className='m-3'>
                        <Form>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Label className='m-1'>{form.title}</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Describe:</Form.Label>
                                    <Form.Label className='m-1'>{form.describe}</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Address:</Form.Label>
                                    <Form.Label className='m-1'>{form.address}</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Button variant="primary" className="m-1" type="button">Like</Button>
                                <Button variant="primary" className="m-1" type="button">Share</Button>
                                <Button variant="primary" className="m-1" type="button" onClick={setFavority}>My favority</Button>
                                <Button variant="primary" className="m-1" type="button" onClick={setSession}>Request for session</Button>
                                <Button variant="primary" className="m-1" type="button">Report case</Button>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Comment</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="text" name="comment" placeholder="Enter Comment" />
                                        <Button variant="primary">Send</Button>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </div>)
}