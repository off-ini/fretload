import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MarchandiseActions';
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
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";

import CustomSelectInput from "../../components/common/CustomSelectInput";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

class EditMarchandise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      libelle: null,
      description:null,
      poid: null,
      volume: null,
      qte: null,
      adresse_depart:null,
      adresse_arrivee:null,
      destinataire:null,
      type: null,
      image:null,

      adresse_all:null,
      destinataire_all:null,
      type_all:null,

      loading:false,
      validing:false,
      errors:null,
    };
  }

  handleNull = () => {
    this.setState({
      libelle: "",
      description: "",
      poid: "",
      volume: "",
      qte: "",
      adresse_depart: null,
      adresse_arrivee: null,
      destinataire:null,
      type: null,
      image:null,
    });
  }

  componentDidMount()
  {
    this.type();
    this.adresse();
    this.destinataire();
  }

  componentWillReceiveProps(nextProps) {
    this.get();
  }

  type = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "tmarchandises/selected")
          .then(res => {
            this.setState({type_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  adresse = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "adresses/selected")
          .then(res => {
            this.setState({adresse_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  destinataire = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "destinataires/selected")
          .then(res => {
            this.setState({destinataire_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  setValues = (res) =>{
    this.setState({
      libelle: res.libelle,
      description: res.description,
      poid: res.poid,
      volume: res.volume,
      qte: res.qte,
      adresse_depart: this.state.adresse_all.find(e => e.id === res.adresse_depart.id),
      adresse_arrivee: this.state.adresse_all.find(e => e.id === res.adresse_arriver.id),
      destinataire: this.state.destinataire_all.find(e => e.id === res.destinataire.id),
      type: this.state.type_all.find(e => e.id === res.type.id),
    })
  } 

  get = () => {
    const {marchandises, id} = this.props;
    const marchandise = marchandises.find( v => v.id === id);
    if(marchandise)
    {
        this.setValues(marchandise)
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

  onValueChangeQ = (values) => {
    const {formattedValue, value} = values;
    this.setState({
      qte:value
    })
  }

  onValueChangeV = (values) => {
    const {formattedValue, value} = values;
    this.setState({
      volume:value
    })
  }

  onValueChangeP = (values) => {
    const {formattedValue, value} = values;
    this.setState({
      poid:value
    })
  }

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { edit, dispatch, history, user, id } = this.props

    const options = {
      libelle: this.state.libelle,
      description: this.state.description,
      poid: this.state.poid,
      volume: this.state.volume,
      qte: this.state.qte,
      adresse_depart_id: this.state.adresse_depart?this.state.adresse_depart.id:null,
      adresse_arriver_id: this.state.adresse_arrivee?this.state.adresse_arrivee.id:null,
      destinataire_id: this.state.destinataire?this.state.destinataire.id:null,
      type_marchandise_id: this.state.type?this.state.type.id:null,
      image:this.state.image,
      user_id: user.id,
    };
    //console.log(options);
    edit(id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_MARCHANDISE, 
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
          Modifier Marchandise
        </ModalHeader>
          <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="libelle" value={this.state.libelle} onChange={this.handleChange} />
                            <span>Libelle *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'libelle')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} md={4} xl={4} xs={4}>
                        <Label className="form-group has-float-label">
                        <NumberFormat format="#######" value={parseFloat(this.state.qte)} customInput={Input} onValueChange={(values) => this.onValueChangeQ(values)} />
                            <span>Quantité</span>
                        </Label>
                    </Col>

                    <Col sm={4} md={4} xl={4} xs={4}>
                        <Label className="form-group has-float-label">
                        <NumberFormat format="#######" value={parseFloat(this.state.poid)} customInput={Input} onValueChange={(values) => this.onValueChangeP(values)} />
                            <span>Poid</span>
                        </Label>
                    </Col>

                    <Col sm={4} md={4} xl={4} xs={4}>
                        <Label className="form-group has-float-label">
                        <NumberFormat format="#######" value={parseFloat(this.state.volume)} customInput={Input} onValueChange={(values) => this.onValueChangeV(values)} />
                            <span>Volume</span>
                        </Label>
                    </Col>
                </Row>
                <Row>
                  <Col sm={6} md={6} xl={6} xs={6}>
                  <NavLink to="/app/adresses/add"><i className="simple-icon-plus"></i></NavLink>
                      <div className="form-group has-float-label">
                          <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              isLoading={this.state.loading}
                              name="adresse_depart"
                              value={this.state.adresse_depart}
                              onChange={this.handleChangeLabelOver}
                              options={this.state.adresse_all}
                              placeholder=""
                          />
                          <span>Adresse depart *</span>
                          {
                            msg.fildsMsgHandler(this.state.errors,'adresse_depart_id')
                          }
                      </div>
                    </Col>
                    <Col sm={6} md={6} xl={6} xs={6}>
                    <NavLink to="/app/adresses/add"><i className="simple-icon-plus"></i></NavLink>
                      <div className="form-group has-float-label">
                          <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              isLoading={this.state.loading}
                              name="adresse_arrivee"
                              value={this.state.adresse_arrivee}
                              onChange={this.handleChangeLabelOver}
                              options={this.state.adresse_all}
                              placeholder=""
                          />
                          <span>Adresse Arrivée *</span>
                          {
                            msg.fildsMsgHandler(this.state.errors,'adresse_arriver_id')
                          }
                      </div>
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
                              msg.fildsMsgHandler(this.state.errors,'type_marchandise_id')
                            }
                        </div>
                    </Col>
                    <Col sm={12}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.state.loading}
                                name="destinataire"
                                value={this.state.destinataire}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.destinataire_all}
                                placeholder=""
                            />
                            <span>Destinataire *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'destinataire_id')
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

  const mapStateToProps = state => {
    return {
      marchandises: state.MarchandiseReducer.marchandises,
      user: state.AuthReducer.user
    }
  }

  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      edit: (id, data) => actionsCreator.edit(id, data)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(EditMarchandise);
