import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/ReciverAction';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";

import CustomSelectInput from "../../components/common/CustomSelectInput";
import DropZone from "../../components/DropZone";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import sexe from '../../data/sex';
import {day, mounth, year} from '../../data/birthday';

class EditReciver extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: null,
        f_name: null,
        day: null,
        mounth: null,
        year: null,
        sexe: null,
        pays: null,
        ville: null,
        phone: null,
        phone_code: null,
        email: null,
        adresse: null,
        pays_all:null,
        loading:false,
        validing:false,
        errors:null,
    };
  }

  handleNull = () => {
      this.setState({
        name: "",
        f_name: "",
        day: null,
        mounth: null,
        year: null,
        sexe: null,
        phone: "",
        email: "",
        adresse: "",
        photo: null,
      });
  }

  componentDidMount()
  {
    this.pays();
  }

  componentWillReceiveProps(nextProps) {
    this.get();
  }
  

  pays = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "pays")
          .then(res => {
            this.setState({pays_all:res.data.data});
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  setValues = (res) =>{
    this.setState({
        name: res.name,
        f_name: res.f_name,
        day: day.find(e => e.key === new Date(res.naissance).getDate() ),
        mounth: mounth.find(e => e.key === new Date(res.naissance).getMonth()+1 ),
        year: year.find(e => e.value === ''+new Date(res.naissance).getFullYear() ),
        sexe: sexe.find(e => e.label === res.sexe),
        pays: res.pays,
        ville: res.ville,
        phone: res.phone,
        phone_code: res.pays ? res.pays.phone_code: "",
        email: res.email,
        photo:this.state.photo,
        adresse: res.adresse,
    })
  } 

  get = () => {
    const {recivers, id} = this.props;
    const reviver = recivers.find( v => v.id === id);
    if(reviver)
    {
        this.setValues(reviver)
    }
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value,
          errors:null
      })
  }

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleFile = (file) => {
    this.createImage('photo', file);
  }

  removeFile = (file) => {
    this.setState({photo:null});
  }

  createImage = (name, file) => {
      let reader = new FileReader();
      reader.onload = (e) =>{
          this.setState({
            [name]: e.target.result
          })
      }
      reader.readAsDataURL(file);
  }

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { edit, dispatch, history, user, id } = this.props

    const year = this.state.year ? this.state.year.value:null;
    const month = this.state.mounth ? this.state.mounth.value:null;
    const date = this.state.day ? this.state.day.value:null;

    const options = {
      name: this.state.name,
      f_name: this.state.f_name,
      naissance: year && month && date ? year+'-'+month+'-'+date : null,
      sexe: this.state.sexe?this.state.sexe.value:null,
      ville_id: this.state.ville?this.state.ville.id:null,
      phone: this.state.phone,
      email: this.state.email,
      adresse: this.state.adresse,
      photo: this.state.photo,
      user_id: user.id,
    };
    //console.log(options);
    edit(id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_RECIVER, 
          payload:res.data
        });
        this.setValues(res.data);
        msg.successHandler(msg.SUCCESS_TITLE, msg.EDIT_SUCCESS);
    })
    .catch(e => {
      msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.EDIT_ERROR);
      this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }


  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        size="lg"
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Modifier Destinataire
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="f_name" value={this.state.f_name} onChange={this.handleChange} />
                            <span>Prénom *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'f_name')
                            }
                        </Label>
                    </Col>
                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            <span>Nom *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'name')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="day"
                                        value={this.state.day}
                                        onChange={this.handleChangeLabelOver}
                                        options={day}
                                        placeholder=""
                                    />
                                    <span>Jour *</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="mounth"
                                        value={this.state.mounth}
                                        onChange={this.handleChangeLabelOver}
                                        options={mounth}
                                        placeholder=""
                                    />
                                    <span>Mois *</span>
                                    {
                                      msg.fildsMsgHandler(this.state.errors,'naissance')
                                    }
                                </div>
                            </Col>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="year"
                                        value={this.state.year}
                                        onChange={this.handleChangeLabelOver}
                                        options={year}
                                        placeholder=""
                                    />
                                    <span>Année *</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="sexe"
                                value={this.state.sexe}
                                onChange={this.handleChangeLabelOver}
                                options={sexe}
                                placeholder=""
                            />
                            <span>Sexe *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'sexe')
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.state.loading}
                                name="pays"
                                value={this.state.pays}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.pays_all}
                                placeholder=""
                            />
                            <span>Pays *</span>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.state.loading}
                                name="ville"
                                value={this.state.ville}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.pays ? this.state.pays.villes : null}
                                placeholder=""
                            />
                            <span>Ville *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'ville_id')
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} md={3} xl={3} xs={3}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="phonecode" value={this.state.phone_code ? '+'+this.state.phone_code : ''} readOnly/>
                            <span>Code</span>
                        </Label>
                    </Col>
                    <Col sm={9} md={9} xl={9} xs={9}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                            <span>Téléphone *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'phone')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            <span>Email *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'email')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} />
                            <span>Adresse</span>
                        </Label>
                    </Col>
                    <Col sm={12}>
                      <Label className="form-group has-float-label">
                          <DropZone
                            handleFile={this.handleFile}
                            removeFile={this.removeFile}
                          />
                          <span>Photo</span>
                      </Label>
                    </Col>
                </Row>
        </ModalBody>
        <ModalFooter>
          <Button Color="secondary" outline onClick={toggleModal}>
            Annuler
          </Button>
          <Button 
              Color="primary" 
              className={`btn-shadow btn-multiple-state ${this.state.validing ? "show-spinner" : ""}`}
              onClick={() => this.handleSubmit()}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
          <span className="label">Valider</span>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

  const mapStateToProps = state => {
    return {
      recivers: state.ReciverReducer.recivers,
      user: state.AuthReducer.user
    }
  }

  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      edit: (id, data) => actionsCreator.edit(id, data)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(EditReciver);
