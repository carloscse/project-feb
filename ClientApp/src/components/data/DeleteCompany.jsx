import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function EditCompany(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hardDelete, setCompanyDelete] = useState(false);


    let handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token_access);
        myHeaders.append("Content-Type", "application/json");
        if(hardDelete === true) {
            try {
                let res = await fetch('/companies/' + props.company.uuid, {
                    headers: myHeaders,
                    method: "DELETE"
                });
                console.log(res)
                // if (res.status === 204) {
                    setCompanyDelete(false);
                    Swal.fire({
                        title: 'Company deleted successfully!',
                        icon: 'success',
                    })
                    window.location.reload(false);
                // }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                let response = await fetch('/companies/' + props.company.uuid, {
                    headers: myHeaders,
                    method: "PUT",
                    body: JSON.stringify({
                        uuid: props.company.uuid,
                        name: props.company.name,
                        deleted: true
                    }),
                });
                const data = await response.json();
                if (response.status === 200) {
                    setShow(false)
                    setCompanyDelete(false);
                    //props.deleteData(data, "company")
                    Swal.fire({
                        title: 'Company updated successfully!',
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
                    <Modal.Title>Delete company</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Alert key="primary" variant="primary">For security reasons, we advice you only delete data if you are completely sure. If you just want to hide the Company from the dashboard, choose the option "Hide Company".</Alert>
                        <Form.Group className="mb-3">
                            <Form.Label className="hard-delete">Delete company from database?</Form.Label>
                            <Form.Check inline label="Delete Company" name="company" type="radio" id={props.company.uuid} onChange={(e) => { setCompanyDelete(true) }} />
                            <Form.Check inline label="Hide Company" name="company" type="radio" id={props.company.uuid} onChange={(e) => { setCompanyDelete(false) }} />
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