import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/VehiculeActions';
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
import DropZone from "../../components/DropZone";

import CustomSelectInput from "../../components/common/CustomSelectInput";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

class AddVehicule extends Component {
  constructor(props) {
    super(props);

    this.state = {
        matricule: null,
        capacite: null,
        taille: null,
        description:null,
        type: null,
        image:null,

        type_all:null,

        loading:false,
        validing:false,
        errors:null,
    };
  }

  handleNull = () => {
      this.setState({
        matricule: "",
        capacite: "",
        taille: "",
        description: "",
        type: null,
        image:null,
      });
  }

  componentDidMount()
  {
    this.type();
  }

  type = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "tvehicules/selected")
          .then(res => {
            this.setState({type_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
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
    this.createImage('image', file);
  }

  removeFile = (file) => {
    this.setState({image:null});
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

    let { create, dispatch, history, user } = this.props

    const options = {
      matricule: this.state.matricule,
      capacite: this.state.capacite,
      taille: this.state.taille,
      description: this.state.description,
      type_vehicule_id: this.state.type ? this.state.type.id : null,
      image:this.state.image,
      user_id: user.id,
    };
    //console.log(options);
    create(options)
    .then(res => {
        dispatch({
          type:actions.CREATE_VEHICULE, 
          payload:res.data
        });
        this.handleNull();
        msg.successHandler(msg.SUCCESS_TITLE, msg.ADD_SUCCESS);
    })
    .catch(e => {
      msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.ADD_ERROR);
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
          Nouveau Vehicule
        </ModalHeader>
          <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="matricule" value={this.state.matricule} onChange={this.handleChange} />
                            <span>Matricule *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'matricule')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6} xl={6} xs={6}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="capacite" value={this.state.capacite} onChange={this.handleChange} />
                            <span>Capacité</span>
                        </Label>
                    </Col>

                    <Col sm={6} md={6} xl={6} xs={6}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="taille" value={this.state.taille} onChange={this.handleChange} />
                            <span>Taille</span>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.state.loading}
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.type_all}
                                placeholder=""
                            />
                            <span>Type *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'type_vehicule_id')
                            }
                        </div>
                    </Col>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <textarea name="description" style={{width:'100%'}} onChange={this.handleChange} rows={4} >{this.state.description}</textarea>
                            <span>Description</span>
                        </Label>
                    </Col>
                    <Col sm={12}>
                      <Label className="form-group has-float-label">
                          <DropZone
                            handleFile={this.handleFile}
                            removeFile={this.removeFile}
                          />
                          <span>Image</span>
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

  
const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
    create: (data) => actionsCreator.create(data)
  }
}

export default connect(null, mapDispatchToProsps)(AddVehicule);
