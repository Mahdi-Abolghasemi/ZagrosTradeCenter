'use client'

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Session_dto } from '@/types/session_type';
import { Session_service } from '@/services/session_service';
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from 'react-bootstrap/Button';


export default function MySession() {
    const objSession: Session_service = new Session_service();
    const [mySession, setMySession] = useState<Session_dto[]>([]);

    useEffect(() => {
        objSession.GetByEmail().then(res => setMySession(res));
    }, []);

    async function remove(id: string): Promise<void> {
        let success: boolean = false;
        await objSession.Delete(id).then(res => success = res);

        if (success) {
            setMySession(mySession.filter(i => i._id !== id));
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        {mySession.length > 0 ?
            <Container><Row xs={6} sm={5} md={4}>
                {mySession.map((value) =>
                    value.caseDetails.map(child =>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={`/uploads/cases/${child.picturePath}`} height={100} width={25} />
                                <CardBody>
                                    <CardTitle>{child.title}</CardTitle>
                                    <CardText>{child.describe}</CardText>
                                    <Button variant='danger m-1' onClick={() => remove(value._id)}>Cancel request for session</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
            </Row></Container> : ""}
    </div>)
}