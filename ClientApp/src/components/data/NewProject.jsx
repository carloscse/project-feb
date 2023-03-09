import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'

function NewProject(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newProject, addProject] = useState({ wtgs: []});

    let handleSubmit = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const responseCompany = await fetch('/companies/' + newProject.company, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const dataCompany = await responseCompany.json();
        try {
            let response = await fetch('/projects/', {
                headers: myHeaders,
                method: "POST",
                body: JSON.stringify({
                    project_name: newProject.project_name,
                    project_number: newProject.project_number,
                    project_status: parseInt(newProject.project_status),
                    number_3l_code: newProject.number_3l_code,
                    project_deal_type: parseInt(newProject.project_deal_type),
                    acquisition_date: newProject.acquisition_date,
                    project_group: parseInt(newProject.project_group),
                    kW: newProject.kW,
                    companyId: parseInt(newProject.company),
                    wtgs: []
                    //company: dataCompany,
                    //wtgs: newProject.wtg,
                }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setShow(false)
                //props.addData(data, "project")
                Swal.fire({
                    title: 'Project created successfully!',
                    icon: 'success',
                })
                window.location.reload(false);
            }
        } catch (err) {
          console.log(err);
        }
    };
    let updateWtg = (e,uuid) => {
        // e.preventDefault()
        console.log(e.target.parentElement)
        console.log(e.target.checked)
        if(e.target.parentElement.parentElement.classList.contains("checked") === true) {
            console.log("Quitar")
            e.target.parentElement.parentElement.classList.remove("checked")
            const index = newProject.wtg.indexOf(e.target.id);
            if (index > -1) {
                newProject.wtg.splice(index, 1);
            }
        } else {
            console.log("Añadir")
            e.target.parentElement.parentElement.classList.add("checked")
            newProject.wtg.push(uuid)
        }
        console.log(newProject.wtg)
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow}>
                <i className="bi bi-plus"></i>
            </Button>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create new project</Modal.Title>
                    <Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(e) => newProject.project_name = (e.target.value)} />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Number</Form.Label>
                                <Form.Control type="text" placeholder="" onChange={(e) => newProject.project_number = (e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Code</Form.Label>
                                <Form.Control type="text" placeholder="" onChange={(e) => newProject.number_3l_code = (e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Status</Form.Label>
                                <Form.Select className="form-control" onChange={(e) => newProject.project_status = (e.target.value)} >
                                    <option value="">Select...</option>
                                    <option value="1">1 Acquisition</option>
                                    <option value="2">2 In Development</option>
                                    <option value="3">3 Operating</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Deal Type</Form.Label>
                                <Form.Select className="form-control" onChange={(e) => newProject.project_deal_type = (e.target.value)} >
                                    <option value="">Select...</option>
                                    <option value="0">Share</option>
                                    <option value="1">Asset</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                                <Form.Label>Acquisition Date</Form.Label>
                                <Form.Control type="date" placeholder="" onChange={(e) => newProject.acquisition_date = (e.target.value)} />
                            </Form.Group>
                        
                        {/* {(newProject.project_status === "Development" || newProject.project_status === "Acquisition") &&
                            <Form.Group className="mb-3">
                                <Form.Label>Acquisition Date</Form.Label>
                                <Form.Control type="date" placeholder="" onChange={(e) => newProject.acquisition_date = (e.target.value)} />
                            </Form.Group>
                        } */}

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Group</Form.Label>
                                <Form.Select className="form-control" onChange={(e) => newProject.project_group = (e.target.value)} >
                                    <option value="">Select group</option>
                                    <option value="1">RW1</option>
                                    <option value="2">RW2</option>
                                    <option value="3">RW3</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>kW</Form.Label>
                                <Form.Control type="number" placeholder="" onChange={(e) => newProject.kW = (e.target.value)} />
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Select className="form-control" onChange={(e) => newProject.company = (e.target.value)} >
                                <option value="">Select company</option>
                                {
                                    props.companies && props.companies.map(item => (
                                        <option key={item.uuid} value={item.uuid}>{item.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        
                        {/*<Form.Group className="mb-3">
                            <Form.Label>WTGs</Form.Label>
                            <div className="d-flex flex-wrap">
                            {
                                props.wtgs && props.wtgs.map(item => (
                                    <div className="wtg-pills" key={item.uuid}>
                                        <Form.Check label={item.name} name="wtg" type="checkbox" id={item.uuid} onChange={(e) => { updateWtg(e,item.uuid) }} />
                                    </div>
                                    // <Form.Check key={item.uuid} inline label={item.name} name="wtgs" type="checkbox" id={item.uuid} onChange={(e) => newProject.wtg.push(e.target.id)} />
                                ))
                            }
                            </div>
                        </Form.Group>*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add Project
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default NewProject