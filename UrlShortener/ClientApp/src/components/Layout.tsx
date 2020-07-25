import * as React from 'react';
import Topbar from './Topbar';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <div className="main-content">
            <Topbar />
            {props.children}
        </div>
    </React.Fragment>
);
