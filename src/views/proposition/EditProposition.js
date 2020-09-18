import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/PropositionActions';
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

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

class EditProposition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description:null,
      pays: null,
      ville: null,
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
      description:"",
      adresse: "",
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
        description:res.description,
        pays: res.pays,
        ville: res.ville,
        adresse: res.adresse,
    })
  } 

  get = () => {
    const {propositions, id} = this.props;
    const proposition = propositions.find( v => v.id === id);
    if(proposition)
    {
        this.setValues(proposition)
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

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { edit, dispatch, history, user, id } = this.props

    const options = {
      name: this.state.name,
      description: this.state.description,
      ville_id: this.state.ville?this.state.ville.id:null,
      adresse: this.state.adresse,
      user_id: user.id,
    };
    //console.log(options);
    edit(id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_PROPOSITION, 
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
          Modifier Proposition
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            <span>Libelle *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'name')
                            }
                        </Label>
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
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} />
                            <span>Adresse</span>
                        </Label>
                    </Col>

                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <textarea name="description" style={{width:'100%'}} onChange={this.handleChange} rows={4} >{this.state.description}</textarea>
                            <span>Description</span>
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
      propositions: state.PropositionReducer.propositions,
      user: state.AuthReducer.user
    }
  }

  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      edit: (id, data) => actionsCreator.edit(id, data)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(EditProposition);
