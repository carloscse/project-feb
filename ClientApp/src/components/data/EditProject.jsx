import React, { useState } from 'react';
import authService from '..//api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'

function EditProject(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    let formatDate = (date) => {
        var d = new Date(date)

        var newDate = d.toISOString()
        return newDate.substring(0, 10)
    }

    const [wtgs, setWtgs] = useState([])
    const [projectName, setProjectName] = useState(props.project.project_name);
    const [projectNumber, setProjectNumber] = useState(props.project.project_number)
    const [projectStatus, setProjectStatus] = useState(props.project.project_status)
    const [number3lCode, setNumber3lCode] = useState(props.project.number_3l_code)
    const [projectDealType, setProjectDealType] = useState(props.project.project_deal_type)
    const [acquisitionDate, setAcquisitionDate] = useState(formatDate(props.project.acquisition_date))
    const [projectGroup, setProjectGroup] = useState(props.project.project_group)
    const [kw, setkw] = useState(props.project.kw)
    const [company, setCompany] = useState(props.project.company)
    const [newWtgs, setNewWtgs] = useState([])

    if (props.project.wtgs !== null) {
        setWtgs(props.project.wtgs)
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(wtgs)
        var wtgs_submit = []
        if (wtgs !== undefined) {
            for (var i = 0; i < wtgs.length; i++) {
                // console.log(typeof wtg[i])
                if (typeof wtgs[i] === "object") {
                    wtgs_submit.push(wtgs[i].uuid)
                } else {
                    wtgs_submit.push(wtgs[i])
                }
                // console.log(wtg_submit)
            }
        }
        var myHeaders = new Headers();
        const token = await authService.getAccessToken();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const responseCompany = await fetch('/companies/' + company.uuid, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const dataCompany = await responseCompany.json();
        try {
            let response = await fetch('/projects/' + props.project.uuid, {
                headers: myHeaders,
                method: "PUT",
                body: JSON.stringify({
                    uuid: props.project.uuid,
                    project_name: projectName,
                    project_number: projectNumber,
                    project_status: parseInt(projectStatus),
                    number_3l_code: number3lCode,
                    project_deal_type: parseInt(projectDealType),
                    acquisition_date: acquisitionDate,
                    project_group: parseInt(projectGroup),
                    kw: kw,
                    companyId: parseInt(company.uuid),
                    company: dataCompany,
                    wtgs: wtgs_submit,
                }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setShow(false)
                console.log("Success")
                //props.updateData(data, 'project')
                Swal.fire({
                    title: 'Project updated successfully!',
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
        console.log(e.target.checked)
        if(e.target.parentElement.parentElement.classList.contains("checked") === true) {
            console.log("Quitar")
            e.target.parentElement.parentElement.classList.remove("checked")
            const index = wtgs.includes(e.target.id);
            console.log(index)
            if (index > -1) {
                wtgs.splice(index, 1);
            }
            console.log(wtgs)
        } else {
            console.log("Añadir")
            e.target.parentElement.parentElement.classList.add("checked")
            wtgs.push(uuid)
            console.log(wtgs)
        }
        setWtgs(wtgs)
    }


    return (
        <>
            <Button variant="outline-primary" className="editButton mr-3" onClick={handleShow}>
                <i className="bi bi-pen"></i>
            </Button>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit project</Modal.Title>
                    {/*<Button variant="link" className="btn-close" onClick={handleClose}><i className="bi bi-x"></i></Button>*/}
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text"  value={projectName} onChange={(e) => { setProjectName(e.target.value) }} />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Number</Form.Label>
                                <Form.Control type="text"  value={projectNumber} onChange={(e) => { setProjectNumber(e.target.value) }} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project 3L Code</Form.Label>
                                <Form.Control type="text"  value={number3lCode} onChange={(e) => { setNumber3lCode(e.target.value) }} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Status</Form.Label>
                                <Form.Select className="form-control" value={projectStatus} onChange={(e) => { setProjectStatus(e.target.value) }} >
                                    <option value="">Select...</option>
                                    <option value="1">1 Acquisition</option>
                                    <option value="2">2 In Development</option>
                                    <option value="3">3 Operating</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Deal Type</Form.Label>
                                <Form.Select className="form-control" value={projectDealType} onChange={(e) => { setProjectDealType(e.target.value) }} >
                                    <option value="">Select...</option>
                                    <option value="0">Share</option>
                                    <option value="1">Asset</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Acquisition Date</Form.Label>
                            <Form.Control type="date" value={acquisitionDate} onChange={(e) => { setAcquisitionDate(e.target.value) }} />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Project Group</Form.Label>
                                <Form.Select className="form-control" value={projectGroup} onChange={(e) => { setProjectGroup(e.target.value) }} >
                                    <option value="">Select group</option>
                                    <option value="1">RW1</option>
                                    <option value="2">RW2</option>
                                    <option value="3">RW3</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>kW</Form.Label>
                                <Form.Control type="number" value={kw} onChange={(e) => { setkw(e.target.value) }} />
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Select className="form-control" value={company} onChange={(e) => { setCompany(e.target.value) }} >
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
                                    props.wtgs && props.wtgs.map(item =>
                                        <div className={(item.projectId === props.project.uuid) ? "wtg-pills checked" : "wtg-pills"} key={item.uuid}>
                                            <Form.Check label={item.name} name="wtgs" type="checkbox" id={item.uuid} onChange={(e) => { updateWtg(e, item.uuid) }} />
                                        </div>
                                    )
                                }
                            </div>
                        </Form.Group>*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default EditProject