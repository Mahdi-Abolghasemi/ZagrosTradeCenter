import Link from "next/link";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
    return (
        <footer>
            <div className="bodyHeader bg-secondary text-white">
                <Row>
                    <Col className="mt-4 mb-4"><Link href={"#"} className="text-white text-decoration-none">X</Link></Col>
                    <Col className="mt-4 mb-4"><Link href={"#"} className="text-white text-decoration-none">FaceBook</Link></Col>
                    <Col className="mt-4 mb-4"><Link href={"#"} className="text-white text-decoration-none">Instagram</Link></Col>
                    <Col className="mt-4 mb-4"><Link href={"#"} className="text-white text-decoration-none">Linkden</Link></Col>
                </Row>
            </div>
            <div className="bodyFooter bg-dark text-white">
                <Row>
                    <Col className="mt-4">
                        <h6>Zagros Trade Center</h6>
                        <p>This is a test project for tread building.</p>
                    </Col>
                    <Col className="mt-4">
                        <h6>Contact us</h6>
                        <p>New York, NY 10012, US</p>
                        <p>info@example.com</p>
                        <p>Phone: + 01 234 567 88</p>
                        <p>FAX: + 01 234 567 89</p>
                    </Col>
                    <Col className="mt-4">
                        <h6><Link href={"#"} className="text-white text-decoration-none">Term and conditions</Link></h6>
                        <h6><Link href={"#"} className="text-white text-decoration-none">FAQ</Link></h6>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}