import React, { Component } from 'react';
import { Projects } from './Projects';

import { Link } from "react-router-dom";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Project Feb</h1>
                <p>Welcome to Project Feb:</p>
                <p>Here you will see data from 3 different sections:</p>
                <ul>
                    <li><strong>Projects</strong></li>
                    <li><strong>Companies</strong></li>
                    <li><strong>WTGs</strong></li>
                </ul>
                <Link variant="primary" className="btn btn-primary" to="/fetch-data">Projects</Link>
            </div>
        );
    }
}
