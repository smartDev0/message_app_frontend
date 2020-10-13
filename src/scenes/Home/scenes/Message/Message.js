import React from 'react';
import './style.css';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Modal, Form, Button } from "react-bootstrap";
import fake_user from "../../../../assets/imgs/avatar-circle-tale.svg";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { Tooltip, Overlay  } from 'react-bootstrap';
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModalActive: false,
            createModalActive: false,
            editModalActive: false,
            message: '',
            value: null,
            current: new Date(),
            messages: {},
            record: [
            ],
            currentRecord: [],
            id:''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('messages')) {
            const records = JSON.parse(localStorage.getItem('messages'));
            this.setState({ record: records });
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
       if (this.state.message === "") {
           NotificationManager.warning('Please add message', '', 2000);
           return;
       } else if (this.state.value === null) {
           NotificationManager.warning('Please add date', '', 2000);
           return;
       }  else {
            const data = {
                date: this.state.value,
                message: this.state.message
            };
            this.state.record.push(data);
            localStorage.setItem('messages', JSON.stringify(this.state.record))
           this.setState({ createModalActive: false, value: null, message: '' });
           NotificationManager.success('Your message is created successfully.', '', 2000);
        }
    }
    handleUpdateSubmit = () => {
         if (this.state.message === "") {
             NotificationManager.warning('Please add message', '', 2000);
             return;
         } else if (this.state.value === null) {
             NotificationManager.warning('Please add date', '', 2000);
             return;
         } else { 
            var records = this.state.record
            records.map((item, index) => {
                if (index == this.state.id) {
                    records[index].date = this.state.value;
                    records[index].message = this.state.message;
                }
            });
            this.setState({ record: records });
            localStorage.setItem('messages', JSON.stringify(this.state.record));
             this.setState({ editModalActive: false, value: null, message: '' });
             NotificationManager.success('Your message is updated successfully.', '', 2000);
        }

    }
    onChangeEdit = (i) => {
        this.setState({id:i})
        var remainRecord = this.state.record.map((item, index) => {
            if (index == i) {
                return item;
            }
        });
        var filterData = remainRecord.filter(item => {
            if (item !== undefined) {
                return item
            }
        });
        this.setState({ currentRecord: filterData, value:filterData[0].date, message:filterData[0].message });
        this.setState({
            editModalActive: true
        })
    }
    onChangeDelete = (i) => {
        
        this.setState({
            deleteModalActive: true,
            id:i
        })
    }
    handleDeleteModalClose = () => {
        this.setState({
            deleteModalActive: false,
        })
    }
    handleEditClose = () => {
        this.setState({
            editModalActive: false
        })
    }
    handleDeleteModalConfirm = () => {
      var remainRecord = this.state.record.map((item, index) => {
            if (index !== this.state.id) {
                return item;
            }
        });
        var filterData = remainRecord.filter(item => {
            if (item !== undefined) {
                return item
            }
        });
        this.setState({ record: filterData, deleteModalActive:false });
        localStorage.setItem('messages', JSON.stringify(filterData));
        NotificationManager.success('Your message is deleted successfully.', '', 2000);
    }
    render() {
        const { record } = this.state;
        return (
            <>
                <nav className="top-navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                        <h6 style={{ margin: '0px 0px 0px 20px' }}>Your Message List</h6>
                        <div className={"action-area"}>
                            <div className="col-auto active ">
                                <div className={"dropdown-toggle d-flex align-items-center"} >
                                    <IoIosArrowDown className="arrow-size"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {record.length > 0 ?
                    (<div className="message-content">
                        {record.map((item, i) => (
                            <div className="message-item" key={i}>
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-10 col-9">
                                            <div className="message-title">
                                                {item.message}
                                            </div>
                                            <div className="message-date">
                                                Scheduled on {moment(item.date).format("DD/MM/YYYY-hh:mm:ss a")}
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-3 d-v-center">
                                            <FaRegEdit style={{ fontSize: 22, cursor: "pointer" }} onClick={() => this.onChangeEdit(i)}/>
                                            <AiOutlineDelete style={{ fontSize: 25, cursor: "pointer" }} onClick={() => this.onChangeDelete(i)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    
                </div>) : (<div className="message-content d-v-center">
                    <h4 className="empty-text">
                            Empty list.Add new message...
                    </h4>
                </div>)}
                <div className="add-message d-v-center" onClick={() => this.setState({createModalActive:true})}>
                    <HiOutlinePlus style={{ fontSize: 26,color:"white"}}/>
                </div>
                {/* create modal */}
                <Modal
                    show={this.state.createModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    // style={MODAL_STYLES}
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
                            minDate={this.state.current}
                        />
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleSubmit() }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* edit modal */}
                <Modal
                    show={this.state.editModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => { this.handleEditClose() }}>
                    <Modal.Header>
                        <Modal.Title>Edit Message</Modal.Title>
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
                            minDate={this.state.current}
                        />
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleEditClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleUpdateSubmit() }}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* delete modal */}
                <Modal show={this.state.deleteModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => { this.handleDeleteModalClose() }}>
                    <Modal.Header>
                        <Modal.Title>Delete Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="alert-body">
                        <div className="modal-contanier ">
                            Are you sure to delete this message permanently?
                       </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleDeleteModalClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleDeleteModalConfirm() }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
           </>
        );
    }
}
export default Message;