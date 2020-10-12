import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/ModePayementAction';
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

import * as msg from '../../utils/messages';

class PayementMission extends Component {
  constructor(props) {
    super(props);

    this.state = {
        numero: null,
        default_image:null,

        loading:false,
        validing:false,
        errors:null,
    };
  }

  handleNull = () => {
      this.setState({
        numero: "",
        default_image:null,
      });
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value,
          errors:null
      })
  }

  handleFile = (file) => {
    this.createImage('default_image', file);
  }

  removeFile = (file) => {
    this.setState({default_image:null});
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

    let { create, dispatch, history} = this.props

    const options = {
      //auth_token:'6b59b6f7-b0f3-498a-ab8b-77c5e6c5ad7e',
      auth_token:'44e087cf-2a90-4bf9-85af-3634a2054e73',
      phone_number: this.state.numero,
      amount:1,
      identifier:new Date().getTime()
    };

    fetch('https://paygateglobal.com/api/v1/pay', 
    {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'include',
      body: JSON.stringify(options)
    }).then(response => {
      console.log(response);
      return response.json();
    })
    .then(res => {
      console.log({res});
    })
    .catch(err => {
      console.log({err});
    })
    .finally(() => this.setState({validing:false}));

    /*axios.post('https://paygateglobal.com/api/v1/pay', options,{
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      crossdomain: true,
    })
        .then(res => {
          console.log({res});
        })
        .catch(err => {
          console.log({err});
        })
        .finally(() => this.setState({validing:false}));*/
    //console.log(options);
    /*create(options)
    .then(res => {
        dispatch({
          type:actions.CREATE_M_PAYEMENT, 
          payload:res.data
        });
        this.handleNull();
        msg.successHandler(msg.SUCCESS_TITLE, msg.ADD_SUCCESS);
    })
    .catch(e => {
      msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.ADD_ERROR);
      this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));*/
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
          Nouveau payement
        </ModalHeader>
        <ModalBody>
            <Row>
                <Col sm={12}>
                    <Label className="form-group has-float-label">
                        <Input type="text" name="numero" value={this.state.libelle} onChange={this.handleChange} />
                        <span>Numero *</span>
                        {
                          msg.fildsMsgHandler(this.state.errors,'libelle')
                        }
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

export default connect(null, mapDispatchToProsps)(PayementMission);
