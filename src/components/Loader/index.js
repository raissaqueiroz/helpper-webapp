import React from 'react';
import { Spinner } from 'react-bootstrap';

import './style.css';

const Loader = () => (
    <div className="container-loader">
        <Spinner className="ml-3" animation="grow" />
        <Spinner className="ml-3" animation="grow" />
        <Spinner className="ml-3" animation="grow" />
    </div>
)

export default Loader;