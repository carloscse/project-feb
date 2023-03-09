import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function EditCompany(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [companyName, setCompanyName] = useState(props.company.name);


    let handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        try {
            let response = await fetch('/companies/' + props.company.uuid, {
                headers: myHeaders,
                method: "PUT",
                body: JSON.stringify({
                    uuid: props.company.uuid,
                    name: companyName
                }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setShow(false)
                props.updateData(data, 'company')
                Swal.fire({
                    title: 'Company updated successfully!',
                    icon: 'success',
                })
                window.location.reload(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button variant="outline-primary" className="editButton mr-3" onClick={handleShow}>
                <i className="bi bi-pen"></i>
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit company</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            {/* <input className='form-control' value={editCompany.name} onChange={(e) => editCompany.name = (e.target.value)}/> */}
                            <Form.Control type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default EditCompany