import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function EditWtg(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hardDelete, setWtgDelete] = useState(false);


    let handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        if(hardDelete === true) {
            try {
                let response = await fetch('/wtgs/' + props.wtg.uuid, {
                    headers: myHeaders,
                    method: "DELETE"
                });
                console.log(response)
                // if (response.status === 204) {
                    setWtgDelete(false);
                    Swal.fire({
                        title: 'Wtg deleted successfully!',
                        icon: 'success',
                    })
                    window.location.reload(false);
                // }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                let response = await fetch('/wtgs/' + props.wtg.uuid, {
                    headers: myHeaders,
                    method: "PUT",
                    body: JSON.stringify({
                        uuid: props.wtg.uuid,
                        name: props.wtg.name,
                        deleted: true
                    }),
                });
                const data = await response.json();
                if (response.status === 200) {
                    setShow(false)
                    setWtgDelete(false);
                    props.deleteData(data, "wtg")
                    Swal.fire({
                        title: 'Wtg updated successfully!',
                        icon: 'success',
                    })
                    window.location.reload(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                <i className="bi bi-trash3"></i>
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete wtg</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Alert key="primary" variant="primary">For security reasons, we advice you only delete data if you are completely sure. If you just want to hide the WTG from the dashboard, choose the option "Hide WTG".</Alert>
                        <Form.Group className="mb-3">
                            <Form.Label className="hard-delete">What do you want to do?</Form.Label>
                            <Form.Check inline label="Delete WTG" name="wtgs" type="radio" id={props.wtg.uuid} onChange={(e) => { setWtgDelete(true) }} />
                            <Form.Check inline label="Hide WTG" name="wtgs" type="radio" id={props.wtg.uuid} onChange={(e) => { setWtgDelete(false) }} />
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