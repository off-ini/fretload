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
  Label,
  Badge
} from "reactstrap";
import Select from "react-select";
import NumberFormat from 'react-number-format';

import CustomSelectInput from "../../components/common/CustomSelectInput";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

class AddAnnonce extends Component {
  constructor(props) {
    super(props);

    this.state = {
        montant: null,
        body:null,
        marchandise: null,
        marchandise_all:[],

        loading:false,
        validing:false,
        errors:null,
        show_marchandise:false,
    };
  }

  handleNull = () => {
      this.setState({
        montant: "",
        body:"",
      });
  }

  componentDidMount()
  {
    this.marchandise();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({show_marchandise:this.props.show, marchandise:this.state.marchandise_all.find(e => e.id === this.props.id)})
  }

  marchandise = () => {
    let {dispatch, history } = this.props
    this.setState({loading:true});
    axios.get(APIModel.HOST + "marchandises/selected")
          .then(res => {
            this.setState({marchandise_all:res.data.data});
          })
          .catch(e => {
            msg.errorHandler(e,dispatch,history)
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

  onValueChange = (values) => {
    const {formattedValue, value} = values;
    this.setState({
      montant:value
    })
  }

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { create, dispatch, history, user } = this.props

    const options = {
      montant: this.state.montant,
      body: this.state.body,
      marchandise_id: this.state.marchandise?this.state.marchandise.id:this.props.id,
      user_id: user.id,
    };
    //console.log(options);
    create(options)
    .then(res => {
        dispatch({
          type:actions.CREATE_ANNONCE, 
          payload:res.data
        });
        this.handleNull();
        msg.successHandler(msg.SUCCESS_TITLE, msg.ADD_SUCCESS);
        this.props.toggleModal()
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
        wrapClassName={`${this.props.position ? 'modal-'+this.props.position:''}`}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Nouvelle Annonce 
          {
            this.state.marchandise ?
            <Badge
                color="primary"
                pill
                className="mb-3"
            >
                {
                    this.state.marchandise_all.find(e => e.id === this.state.marchandise.id).label
                }
            </Badge>
            :null
          }
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <NumberFormat thousandSeparator={true} mask=" " customInput={Input} onValueChange={(values) => this.onValueChange(values)} />
                            <span>Montant *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'montant')
                            }
                        </Label>
                    </Col>
                </Row>
                {
                  this.state.show_marchandise ?
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
                  :null
                }
                
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

  
  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      create: (data) => actionsCreator.create(data)
    }
  }

export default connect(null, mapDispatchToProsps)(AddAnnonce);
