import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function NewWTG(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newWTG, addWTG] = useState({});
    const [projectId, setProjectId] = useState({});

    let handleSubmit = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        try {
            let response = await fetch('/wtgs/', {
                headers: myHeaders,
                method: "POST",
                body: JSON.stringify({
                    name: newWTG.name,
                    projectId: newWTG.projectId
                }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setShow(false)
                props.addData(data, "wtg")
                Swal.fire({
                    title: 'WTG created successfully!',
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
            <Button variant="primary" size="sm" onClick={handleShow}>
                <i className="bi bi-plus"></i>
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create new company</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>WTG Name</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(e) => newWTG.name = (e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select className="form-control" value={projectId} onChange={(e) => newWTG.projectId = (e.target.value)} >
                                <option value="">Select project</option>
                                {
                                    props.projects && props.projects.map(item => (
                                        <option key={item.uuid} value={item.uuid}>{item.project_name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add WTG
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default NewWTG