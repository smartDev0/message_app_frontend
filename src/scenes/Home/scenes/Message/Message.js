import React from 'react';
import './style.css';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Modal, Form, Button } from "react-bootstrap";
import fake_user from "../../../../assets/imgs/avatar-circle-tale.svg";
import DateTimePicker from 'react-datetime-picker';

const MODAL_STYLES = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, .5)'
    },
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        height: '150px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'show',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'

    }
};
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModalActive: false,
            createModalActive: false,
            editModalActive: false,
            message: '',
            value: null,
            messages: {},
            record: [
                {
                    date: 'Thu Oct 08 2020 00:00:00 GMT+0800 (Taipei Standard Time)',
                    message:'aaa'}
            ]
        }
    }
    handleClose() {
        this.setState({
            createModalActive: false
        })
    }
    handleChange = (event) => {
        this.setState({
            value: event,
        });
    }
    handleSubmit = () => {
        const data = {
            date: this.state.value,
            message: this.state.message
        };
        this.state.record.push(data);
        this.setState({ createModalActive: false, value: null, message:''})

    }
    render() {
        console.log(this.state.record)
        return (
            <>
                <nav className="top-navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                        <h6 style={{ margin: '0px 0px 0px 20px' }}>Your Message List</h6>
                        <div className={"action-area"}>
                            <div className="col-auto active ">
                                <div className={"dropdown-toggle d-flex align-items-center"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {/* <i className="fa fa-arrow-down" aria-hidden="true"></i> */}
                                    <IoIosArrowDown className="arrow-size"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="message-content d-v-center">
                    <h4 className="empty-text">
                        Empty list.Add new message...
                    </h4>
                </div>
                <div className="add-message d-v-center" onClick={() => this.setState({createModalActive:true})}>
                    <HiOutlinePlus style={{ fontSize: 26,color:"white"}}/>
                </div>
                {/* create modal */}
                <Modal
                    show={this.state.createModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={MODAL_STYLES}
                    onHide={() => { this.handleClose() }}>
                    <Modal.Header>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-2 col-2">
                                <img src={fake_user} alt="" className={"avatar"} />
                            </div>
                            <div className="col-md-10 col-10">
                                <Form.Control as="textarea" placeholder="Message..." rows="3" onChange={(e) => { this.setState({ message: e.target.value }) }} value={this.state.message ? this.state.message : ''} />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <DateTimePicker
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleSubmit() }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
           </>
        );
    }
}
export default Message;