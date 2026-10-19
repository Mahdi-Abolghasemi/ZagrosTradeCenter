'use client'

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Favority_dto } from '@/types/favority_type';
import { Favority_service } from '@/services/favority_service';
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from 'react-bootstrap/Button';

export default function MyFavority() {
    const objFavority: Favority_service = new Favority_service();
    const [myFavority, setMyFavority] = useState<Favority_dto[]>([]);

    useEffect(() => {
        objFavority.GetByEmail().then(res => setMyFavority(res));
    }, []);

    async function remove(id: string): Promise<void> {
        let success: boolean = false;
        await objFavority.Delete(id).then(res => success = res);

        if (success) {
            setMyFavority(myFavority.filter(i => i._id !== id));
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        {myFavority.length > 0 ?
            <Container><Row xs={6} sm={5} md={4}>
                {myFavority.map((value) =>
                    value.caseDetails.map(child =>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={`/uploads/cases/${child.picturePath}`} height={100} width={25} />
                                <CardBody>
                                    <CardTitle>{child.title}</CardTitle>
                                    <CardText>{child.describe}</CardText>
                                    <Button variant='danger m-1' onClick={() => remove(value._id)}>Exit of favority list</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
            </Row></Container> : ""}
    </div>)
}