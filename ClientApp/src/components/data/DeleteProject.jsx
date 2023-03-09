import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

function EditProject(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hardDelete, setProjectDelete] = useState(false);


    let handleSubmit = async (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token_access);
        myHeaders.append("Content-Type", "application/json");
        if (hardDelete === true) {
            try {
                let res = await fetch('/projects/' + props.project.uuid, {
                    headers: myHeaders,
                    method: "DELETE"
                });
                console.log(res)
                // if (res.status === 204) {
                    setProjectDelete(false);
                    Swal.fire({
                        title: 'Project deleted successfully!',
                        icon: 'success',
                    })
                    window.location.reload(false);
                // }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                let response = await fetch('/projects/' + props.project.uuid, {
                    headers: myHeaders,
                    method: "PUT",
                    body: JSON.stringify({
                        uuid: props.project.uuid,
                        project_name: props.project.project_name,
                        project_number: props.project.project_number,
                        project_status: props.project.project_status,
                        number_3l_code: props.project.number_3l_code,
                        project_deal_type: props.project.project_deal_type,
                        acquisition_date: props.project.acquisition_date,
                        project_group: props.project.project_group,
                        kw: props.project.kw,
                        companyId: props.project.companyId,
                        deleted: true,
                        Wtgs: []
                    }),
                });
                if (response.status === 200) {
                    setProjectDelete(false);
                    Swal.fire({
                        title: 'Project updated successfully!',
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
                    <Modal.Title>Delete project</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Alert key="primary" variant="primary">For security reasons, we advice you only delete data if you are completely sure. If you just want to hide the project from the dashboard, choose the option "Hide Project".</Alert>
                        <Form.Group className="mb-3">
                            <Form.Label className="hard-delete">Delete project from database?</Form.Label>
                            <Form.Check inline label="Delete project" name="project" type="radio" onChange={(e) => { setProjectDelete(true) }} />
                            <Form.Check inline label="Hide project" name="project" type="radio"  onChange={(e) => { setProjectDelete(false) }} />
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

export default EditProject