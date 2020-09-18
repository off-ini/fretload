import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AnnonceActions';
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

class EditAnnonce extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      body:null,
      marchandise: null,
      marchandise_all:null,

      loading:false,
      validing:false,
      errors:null,
    };
  }

  handleNull = () => {
    this.setState({
      title: "",
        body:"",
    });
  }

  componentDidMount()
  {
    this.marchandise();
  }

  componentWillReceiveProps(nextProps) {
    this.get();
  }
  

  marchandise = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "marchandises/selected")
          .then(res => {
            this.setState({marchandise_all:res.data.data});
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  setValues = (res) =>{
    this.setState({
      title: res.title,
      body: res.body,
      marchandise: this.state.marchandise_all.find(e => e.id === res.marchandise.id),
    })
  } 

  get = () => {
    const {annonces, id} = this.props;
    const annonce = annonces.find( v => v.id === id);
    if(annonce)
    {
        this.setValues(annonce)
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
      title: this.state.title,
      body: this.state.body,
      marchandise_id: this.state.marchandise?this.state.marchandise.id:null,
      user_id: user.id,
    };
    //console.log(options);
    edit(id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_ANNONCE, 
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
          Modifier Annonce
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                            <span>Titre *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'title')
                            }
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
                                name="marchandise"
                                value={this.state.marchandise}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.marchandise_all}
                                placeholder=""
                            />
                            <span>Marcahndise *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'marchandise_id')
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <textarea name="body" style={{width:'100%'}} onChange={this.handleChange} rows={4} >{this.state.body}</textarea>
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
      annonces: state.AnnonceReducer.annonces,
      user: state.AuthReducer.user
    }
  }

  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      edit: (id, data) => actionsCreator.edit(id, data)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(EditAnnonce);
