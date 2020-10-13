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
  Label,
  Badge
} from "reactstrap";
import Select from "react-select";
import NumberFormat from 'react-number-format';

import CustomSelectInput from "../../components/common/CustomSelectInput";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

class Edit2Proposition extends Component {
  constructor(props) {
    super(props);

    this.state = {
        montant_p : null,
        annonce:null,

        loading:false,
        validing:false,
        errors:null,
    };
  }

  componentDidMount()
  {
    //this.detail();
  }


  detail = () => {
    const { annonce_id, detailByAnnonceAndUser, dispatch, history, user} = this.props;
    detailByAnnonceAndUser(annonce_id, user.id)
    .then(res => {
      this.setState({annonce:res.data.annonce});
    }).catch(e => {
      msg.errorHandler(e,dispatch, history)
      this.props.history.push('/app/propostions');
    })
    .finally(() => this.setState({loading:false}));
  }


  handleNull = () => {
      this.setState({
        montant_p : "",
      });
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
      montant_p :value
    })
  }

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { annonce_id, edit, dispatch, history, user_id } = this.props;

    const options = {
      montant_p:this.state.montant_p,
      user_id: user_id,
      annonce_id: annonce_id,
    };
    //console.log(options);
    edit(annonce_id, user_id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_PROPOSITION, 
          payload:res.data
        });
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
        wrapClassName={`${this.props.position ? 'modal-'+this.props.position:''}`}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Nouvelle Proposition 
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <NumberFormat thousandSeparator={true} mask=" " value={parseFloat(this.state.montant_p )} customInput={Input} onValueChange={(values) => this.onValueChange(values)} />
                            <span>Montant *</span>
                            {
                            msg.fildsMsgHandler(this.state.errors,'montant_p')
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

  
const mapStateToProps = state => {
    return {
      user: state.AuthReducer.user
    }
}
    
const mapDispatchToProsps = dispatch => {
return {
    dispatch:dispatch,
    edit: (annonce_id, user_id, data) => actionsCreator.edit(annonce_id, user_id, data),
    detailByAnnonceAndUser: (annonce_id, user_id) => actionsCreator.detailByAnnonceAndUser(annonce_id, user_id)
}
}

export default connect(mapStateToProps, mapDispatchToProsps)(Edit2Proposition);
