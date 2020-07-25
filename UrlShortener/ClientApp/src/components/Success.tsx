import * as React from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { ShortenUrl } from '../store/shortenUrl';

interface SuccessProps {
    successUrl: ShortenUrl
    clear: () => void;
}


export default (props: SuccessProps) => {
    var handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.clear();
    }

    return (
        <React.Fragment>
            <div className="form-container">
                <div className="form-wrapper">
                    <div className="form-header">Success</div>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="shortenUrl" readOnly id="shortenUrl" value={props.successUrl.alias} />
                            <Label className="bold-label">Long URL</Label>
                            <Label className="full-path">{props.successUrl.url}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Button className="btn-ok" onClick={handleSubmit} >
                                <span className="btn-text">OK</span>
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
}