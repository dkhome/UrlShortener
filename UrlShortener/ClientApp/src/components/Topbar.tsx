import * as React from 'react';

export default class Topbar extends React.PureComponent<{}> {
    public render() {
        return (
            <div className="top-bar">
                <img className="logo" src={require("../images/Logo.png")} alt="Astorian" />
            </div>
        );
    }
}
