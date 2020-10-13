import React from 'react';
class Message extends React.Component {
    render() {
        return (
            <div>
                <nav className="top-navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                        <h6 style={{ margin: '0px 0px 0px 20px' }}>Your Message List</h6>
                        <div className={"action-area"}>
                            <div className="col-auto active ">
                                <div className={"dropdown-toggle d-flex align-items-center"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
           </div>
        );
    }
}
export default Message;