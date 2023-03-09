import React, { useEffect, useState } from 'react';
import authService from '../api-authorization/AuthorizeService'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableFilter from 'react-table-filter';

import NewProject from './NewProject'
import NewCompany from './NewCompany'
import NewWTG from './NewWTG'

import EditProject from './EditProject'
import EditCompany from './EditCompany'
import EditWtg from "./EditWTG";

import DeleteProject from './DeleteProject'
import DeleteCompany from './DeleteCompany'
import DeleteWtg from "./DeleteWTG";

function TableComponent(props) {
    const [show, setShow] = useState(false);

    const [data, setData] = useState(this.props.data)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(props.data)


    let filterUpdatedCompanies = (newData, filterConfiguration) => {
        this.setState({
            "companies": newData
        });
    }

    let addData = (data, type) => {
        console.log(data)
        if (type === "project") {
            let projects = this.state.projects
            projects.push(data);
            this.setState({ projects: projects })
        } else if (type === "company") {
            let companies = this.state.companies
            companies.push(data);
            this.setState({ companies: companies })
        } else if (type === "wtg") {
            let wtgs = this.state.wtgs
            wtgs.push(data);
            this.setState({ wtgs: wtgs })
        }
    };
    useEffect(() => {
        let updateData = (data, type) => {
            console.log(data)
            if (type === "project") {
                let index = this.state.projects.findIndex(p => p.uuid === data.uuid);
                let projects = this.state.projects
                projects[index] = data;
                console.log(projects);
                this.setState({ projects: projects })
            } else if (type === "company") {
                let index = this.state.companies.findIndex(c => c.uuid === data.uuid);
                let companies = this.state.companies
                companies[index] = data;
                //this.setState({ companies: companies })
            } else if (type === "wtg") {
                let index = this.state.wtgs.findIndex(w => w.uuid === data.uuid);
                let wtgs = this.state.wtgs
                wtgs[index] = data;
                this.setState({ wtgs: wtgs })
            }
        };
    }, [data]); 
    

    let deleteData = (data, type) => {
        console.log(data)
        console.log(type)
        if (type === "project") {
            let index = this.state.projects.findIndex(p => p.uuid === data.uuid);
            let projects = this.state.projects
            delete projects[index];
            this.setState({ projects: projects })
        } else if (type === "company") {
            let index = this.state.companies.findIndex(c => c.uuid === data.uuid);
            let companies = this.state.companies
            delete companies[index];
            this.setState({ companies: companies })
        } else if (type === "wtg") {
            let index = this.state.wtgs.findIndex(w => w.uuid === data.uuid);
            let wtgs = this.state.wtgs
            delete wtgs[index];
            this.setState({ wtgs: wtgs })
        }
    };
    return (
        <>
            <div className="table-responsive">
                <Table className="table-companies">
                    <thead>
                        <TableFilter rows={data} onFilterUpdate={this.filterUpdatedCompanies}>
                            <th filterkey="name">Name</th>
                            <th>Actions</th>
                        </TableFilter>
                    </thead>
                    <tbody>
                        {
                            this.props.data && this.props.data.map(item => (
                                <tr id={item.uuid} key={item.uuid}>
                                    <td>{item.name}</td>
                                    {/*<td><EditCompany updateData={this.updateData} company={item} /><DeleteCompany deleteData={this.deleteData} company={item} /></td>*/}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default EditCompany