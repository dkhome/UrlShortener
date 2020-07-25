import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import * as ShortenUrl from '../store/shortenUrl';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Success from './Success';
import { actionCreators } from '../store/actions';
import { ShortenUrlState } from '../store/shortenUrlReducer';
import Errors from './Errors';

type ShortenUrlProps =
    ShortenUrlState
    & typeof actionCreators; 

class Home extends React.PureComponent<ShortenUrlProps, ShortenUrl.ShortenUrl> {
    constructor(props: any) {
        super(props);

        this.state = { url: "", alias: "" };
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.saveShortenUrl(this.state);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [event.target.name]: event.target.value } as React.ComponentState);
    }

    handleClear = () => {
        this.props.clear();
        this.setState({ url: "", alias: "" });
    }

    public render(): React.ReactNode {
        switch (this.props.status) {
            case ShortenUrl.Status.Pending:
                return this.renderSpinner();
            case ShortenUrl.Status.Existing:
                window.location.href = this.props.current.url;
                return this.renderSpinner();
            case ShortenUrl.Status.Success:
                return (<Success successUrl={this.props.current} clear={this.handleClear} />);
        }
        return this.renderForm();
    }

    renderForm(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-header">Free URL Shortener</div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="url">URL to Shorten</Label>
                                <Input type="text" name="url" id="url" placeholder="https://example.com" onChange={this.handleChange} value={this.state.url} />
                            </FormGroup>
                            <Label for="alias">Alias</Label>
                            <InputGroup>
                                <Input className="alias" type="text" name="alias" id="alias" placeholder="Enter an alias..." onChange={this.handleChange} value={this.state.alias} />
                                <InputGroupAddon addonType="append">
                                    <Button type="submit">
                                        <i className="cut"></i>
                                        <span className="btn-text">Shorten!</span>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            {this.props.errors.length > 0 && <Errors errors={this.props.errors} />}
                        </Form>
                    </div>
                </div>
            </React.Fragment>);
    }

    renderSpinner(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="loader"></div>
            </React.Fragment>);
    }
};

export default connect(
    (state: ApplicationState) => state.shortenUrl, 
    actionCreators 
    ) (Home as any);


