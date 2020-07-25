import { Label } from "reactstrap";
import * as React from 'react';

interface ErrorsProps {
    errors: string[];
}

export default (props: ErrorsProps) => (
    <React.Fragment>
        <div className="div-errors">
            <Label className="lbl-error-header">Errors</Label>
            {props.errors.map(e => <Label className="lbl-error">{e}</Label>)}
        </div>
    </React.Fragment>
)
