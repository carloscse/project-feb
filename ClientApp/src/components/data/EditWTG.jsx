import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function EditWtg(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [wtgName, setWtgName] = useState(props.wtg.name);
    const [projectId, setProjectId] = useState(props.wtg.projectId);

    let handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        try {
            let response = await fetch('/wtgs/' + props.wtg.uuid, {
                headers: myHeaders,
                method: "PUT",
                body: JSON.stringify({
                    uuid: props.wtg.uuid,
                    name: wtgName,
                    projectId, projectId
                }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setShow(false)
                props.updateData(data, 'wtg')
                Swal.fire({
                    title: 'Wtg updated successfully!',
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
                    <Modal.Title>Edit wtg</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Wtg Name</Form.Label>
                            {/* <input className='form-control' value={editWtg.name} onChange={(e) => editWtg.name = (e.target.value)}/> */}
                            <Form.Control type="text" value={wtgName} onChange={(e) => { setWtgName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select className="form-control" value={projectId} onChange={(e) => { setProjectId(e.target.value) }} >
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
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default EditWtg