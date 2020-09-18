import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/TypeMarchandiseActions';
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
import DropZone from "../../components/DropZone";

import * as msg from '../../utils/messages';

class EditTMarchandise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      libelle: null,
      default_image:null,

      loading:false,
      validing:false,
      errors:null,
    };
  }

  handleNull = () => {
    this.setState({
      libelle: null,
      default_image:null,
    });
  }


  componentWillReceiveProps(nextProps) {
    this.get();
  }


  setValues = (res) =>{
    this.setState({
        libelle: res.libelle,
    })
  } 

  get = () => {
    const {tmarchandises, id} = this.props;
    const tmarchandise = tmarchandises.find( v => v.id === id);
    if(tmarchandise)
    {
        this.setValues(tmarchandise)
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

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

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

    let { edit, dispatch, history, id } = this.props

    const options = {
      libelle: this.state.libelle,
      default_image: this.state.default_image,
    };
    //console.log(options);
    edit(id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_T_MARCHANDISE, 
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
         Modifier Type Marchandise
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
    tmarchandises: state.TypeMarchandiseReducer.tmarchandises,
  }
}

const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
    edit: (id, data) => actionsCreator.edit(id, data)
  }
}

export default connect(mapStateToProps, mapDispatchToProsps)(EditTMarchandise);
