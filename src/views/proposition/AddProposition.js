import React, { Component } from "react";
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
} from "reactstrap";


import * as msg from '../../utils/messages';

class AddProposition extends Component {
  constructor(props) {
    super(props);

    this.state = {
        montent_t: null,

        loading:false,
        validing:false,
        errors:null,
    };
  }

  handleNull = () => {
      this.setState({
        montent_t: "",
      });
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

    let { edit, dispatch, history, user, annonce_id } = this.props

    const options = {
      montant_t:this.state.montent_t,
      status:true,
      user_id: user.id,
      annonce_id: annonce_id,
    };
    //console.log(options);
    edit(annonce_id, user.id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_PROPOSITION, 
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
                        <Input type="text" name="montent_t" value={this.state.montent_t} onChange={this.handleChange}  invalid/>
                        <span>Montent *</span>
                        {
                          msg.fildsMsgHandler(this.state.errors,'montant_t')
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
      edit: (annonce_id, user_id, data) => actionsCreator.edit(annonce_id, user_id, data)
    }
  }

export default connect(null, mapDispatchToProsps)(AddProposition);
