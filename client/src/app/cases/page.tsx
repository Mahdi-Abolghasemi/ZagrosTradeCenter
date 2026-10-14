'use client'

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Case_type } from '@/types/case_type';
import { Case_service } from '@/services/case_service';
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Link from "next/link";

export default function Cases() {
    const objCase: Case_service = new Case_service();
    const [cases, setCases] = useState<Case_type[]>([]);

    useEffect(() => {
        objCase.GetAll().then(res => setCases(res));
    }, []);

    return (<div className="bodyHome bg-info-subtle">
        {cases.length > 0 ?
            <Container><Row xs={6} sm={5} md={4}>
                {cases.map((value) =>
                    <Col>
                        <Card>
                            <Link href={{ pathname: "/cases/selectedCase", query: { id: value._id } }}>
                                <Card.Img variant="top" src={`/uploads/cases/${value.picturePath}`} height={100} width={25} />
                            </Link>
                            <CardBody>
                                <CardTitle>{value.title}</CardTitle>
                                <CardText>{value.describe}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row></Container> : ""}
    </div>)
}