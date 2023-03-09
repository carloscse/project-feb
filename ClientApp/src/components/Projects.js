import React, { Component } from "react"
import authService from './api-authorization/AuthorizeService'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableFilter from 'react-table-filter';

import NewProject from '../components/data/NewProject'
import NewCompany from '../components/data/NewCompany'
import NewWTG from '../components/data/NewWTG'

import EditProject from '../components/data/EditProject'
import EditCompany from '../components/data/EditCompany'
import EditWtg from "../components/data/EditWTG";

import DeleteProject from '../components/data/DeleteProject'
import DeleteCompany from '../components/data/DeleteCompany'
import DeleteWtg from "../components/data/DeleteWTG";

export class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            projects: [],
            companies: [],
            wtgs: [],
            isLoading: true,
        };
    }

    async componentDidMount() {
        const token = await authService.getAccessToken();
        const response = await fetch('/projects/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        for (var i = 0; i < data.length; i++) {
            if (data[i].company === null) {
                const response = await fetch('/companies/' + data[i].companyId, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const dataCompany = await response.json();
                data[i].company = dataCompany
            }
        }
        this.setState({ projects: data });
        console.log(data);

        const responseCompanies = await fetch('/companies/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const dataCompanies = await responseCompanies.json();
        this.setState({ companies: dataCompanies });
        console.log(dataCompanies)

        const responseWtgs = await fetch('/wtgs/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const dataWtgs = await responseWtgs.json();
        for (var i = 0; i < dataWtgs.length; i++) {
            if (dataWtgs[i].project === null && dataWtgs[i].projectId !== 0) {
                const response = await fetch('/projects/' + dataWtgs[i].projectId, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const dataProject = await response.json();
                dataWtgs[i].project = dataProject
            }
        }
        this.setState({ wtgs: dataWtgs, loading: false });
        console.log(dataWtgs)
        this.setState({ isLoading: false });
    };
    
    addData = (data, type) => {
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

    updateData = (data, type) => {
        console.log(data)
        if (type === "project") {
            let index = this.state.projects.findIndex(p => p.uuid === data.uuid);
            let projects = this.state.projects
            projects[index] = data;
            this.setState({ projects: projects })
        } else if (type === "company") {
            let index = this.state.companies.findIndex(c => c.uuid === data.uuid);
            let companies = this.state.companies
            companies[index] = data;
            this.setState({ companies: companies })
        } else if (type === "wtg") {
            let index = this.state.wtgs.findIndex(w => w.uuid === data.uuid);
            let wtgs = this.state.wtgs
            wtgs[index] = data;
            this.setState({ wtgs: wtgs })
        }
    };

    deleteData = (data, type) => {
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

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        // var newDate = d.toISOString()
        // return newDate.substring(0, 10)

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    }

    calcMonthsAcquired(date) {
        var d = new Date(date)
        var year_d = d.getFullYear()
        var months;

        var today = new Date();
        var year_today = today.getFullYear();
        // console.log(today)
        // console.log(current_today)
        months = (year_today - year_d) * 12;
        months -= d.getMonth();
        months += today.getMonth();
        return months <= 0 ? 0 : months;
    }

    filterUpdatedProjects = (newData, filterConfiguration) => {
        this.setState({
            "projects": newData
        });
    }

    filterUpdatedCompanies = (newData, filterConfiguration) => {
        this.setState({
            "companies": newData
        });
    }

    filterUpdatedWtgs = (newData, filterConfiguration) => {
        this.setState({
            "wtgs": newData
        });
    }

    render() {
        //if (localStorage.token_access === undefined) {
        //    return <redirect to='/login' />
        //} else {
            if (this.state.isLoading === true) {
                return (
                    <h1>Loading</h1>
                );
            } else {
                return (
                    <div className="p-5 my-5">
                        <div className="sectionHeading d-flex align-items-center mb-4">
                            <h3 className="sectionName">Projects</h3>
                            <NewProject addData={this.addData} companies={this.state.companies} wtgs={this.state.wtgs} />
                        </div>
                        <div className="table-responsive">
                            <Table className="table-projects table card-table table-vcenter text-nowrap">
                                <thead>
                                    <TableFilter rows={this.state.projects} onFilterUpdate={this.filterUpdatedProjects}>
                                        <th filterkey="project_name">Name</th>
                                        <th filterkey="project_number">Number</th>
                                        <th filterkey="project_status">Status</th>
                                        <th filterkey="number_3l_code">Code</th>
                                        <th filterkey="project_deal_type">Deal Type</th>
                                        <th filterkey="project_group">Group</th>
                                        <th filterkey="company.name">Company</th>
                                        <th filterkey="acquisition_date">Acq. Date</th>
                                        <th filterkey="months_acquired">Months Acq.</th>
                                        <th filterkey="kw">kW</th>
                                        {/*<th>WTGs</th>*/}
                                        <th>Actions</th>
                                    </TableFilter>
                                </thead>
                                {/* <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Status</th>
                                        <th>Code</th>
                                        <th>Deal Type</th>
                                        <th>Group</th>
                                        <th>Company</th>
                                        <th>Acq. Date</th>
                                        <th>Months Acq.</th>
                                        <th>kW</th>
                                        <th>WTGs</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {
                                    this.state.projects && this.state.projects.map(item => (
                                        <tr key={item.uuid}>
                                            <td>{item.project_name}</td>
                                            <td>{item.project_number}</td>
                                            {(item.project_status === 1) &&
                                                <td>Acquisition</td>
                                            }
                                            {(item.project_status === 2) &&
                                                <td>In Development</td>
                                            }
                                            {(item.project_status === 3) &&
                                                <td>Operating</td>
                                            }
                                            <td>{item.number_3l_code}</td>

                                            {(item.project_deal_type === 0) &&
                                                <td>Share</td>
                                            }
                                            {(item.project_deal_type === 1) &&
                                                <td>Asset</td>
                                            }
                                            <td>{item.project_group}</td>
                                            {(item.company !== null && item.company !== undefined)
                                                ? <td>{item.company.name}</td>
                                                : <td>-</td>
                                            }
                                            {(item.project_status !== 1)
                                                ? <td>{this.formatDate(item.acquisition_date)}</td>
                                                : <td>-</td>
                                            }
                                            {(item.project_status !== 1)
                                                ? <td>{this.calcMonthsAcquired(item.acquisition_date)}</td>
                                                : <td>0</td>
                                            }
                                            <td>{item.kw}</td>
                                            {/*<td>*/}
                                            {/*    <div className="wtg-wrapper">{*/}
                                            {/*        item.wtg && item.wtg.map(w => (*/}
                                            {/*            <div id={w.uuid} key={w.uuid}>{w.name}</div>*/}
                                            {/*        ))*/}
                                            {/*    }</div>*/}
                                            {/*</td>*/}
                                            {/*<td></td>*/}
                                            <td><EditProject updateData={this.updateData} project={item} companies={this.state.companies} wtgs={this.state.wtgs} /><DeleteProject project={item} /></td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <Row className="mt-5">
                            <Col>
                                <div className="sectionHeading d-flex align-items-center mb-4">
                                    <h3 className="sectionName mr-4">Companies</h3>
                                    <NewCompany addData={this.addData} />
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-companies">
                                        <thead>
                                            <TableFilter rows={this.state.companies} onFilterUpdate={this.filterUpdatedCompanies}>
                                                <th filterkey="name">Name</th>
                                                <th>Actions</th>
                                            </TableFilter>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.companies && this.state.companies.map(item => (
                                                    <tr id={item.uuid} key={item.uuid}>
                                                        <td>{item.name}</td>
                                                        <td><EditCompany updateData={this.updateData} company={item} /><DeleteCompany deleteData={this.deleteData} company={item} /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col>
                                <div className="sectionHeading d-flex align-items-center mb-4">
                                    <h3 className="sectionName mr-4">WTGs</h3>
                                    <NewWTG addData={this.addData} />
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-wtgs">
                                        <thead>
                                            <TableFilter rows={this.state.wtgs} onFilterUpdate={this.filterUpdatedWtgs}>
                                                <th filterkey="name">Name</th>
                                                <th filterkey="project.project_name">Project</th>
                                                <th>Actions</th>
                                            </TableFilter>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.wtgs && this.state.wtgs.map(item => (
                                                    <tr key={item.uuid}>
                                                        <td>{item.name}</td>
                                                        {(item.project !== null && item.project !== undefined)
                                                            ? <td>{item.project.project_name}</td>
                                                            : <td>-</td>
                                                        }
                                                        <td><EditWtg updateData={this.updateData} wtg={item} projects={this.state.projects} /><DeleteWtg deleteData={this.deleteData} wtg={item} /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            }
        //}
    }
}

//export default Projects;
