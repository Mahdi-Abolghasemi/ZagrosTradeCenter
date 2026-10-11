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
import Button from 'react-bootstrap/Button';

export default function MyCase() {
    const objCase: Case_service = new Case_service();
    const [myCases, setMyCases] = useState<Case_type[]>([]);

    useEffect(() => {
        objCase.GetByEmail().then(res => setMyCases(res));
    }, []);


    async function remove(id: string): Promise<void> {
        console.log(`id is: ${id}`)
        let success: boolean = false;
        await objCase.Delete(id).then(res => success = res);

        if (success) {
            setMyCases(myCases.filter(i => i._id !== id));
        }
    }

    return (<div className="bodyHome bg-info-subtle">
        {myCases.length > 0 ?
            <Container><Row xs={6} sm={5} md={4}>
                {myCases.map((value, index) =>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={`/uploads/cases/${value.picturePath}`} height={100} width={25} />
                            <CardBody>
                                <CardTitle>{value.title}</CardTitle>
                                <CardText>{value.describe}</CardText>
                                <Button variant='danger m-1' onClick={() => remove(value._id)}>Delete</Button>
                                <Link className="btn btn-warning" href={{ pathname: "/cases/myCase/editCase", query: { id: value._id } }}>Edit</Link>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row></Container> : ""}
        <Link className="btn btn-primary" href={"/cases/myCase/newCase"}>Add new case</Link>
    </div>)
}