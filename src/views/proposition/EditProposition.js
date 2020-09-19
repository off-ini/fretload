import React, { Component, Fragment } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/PropositionActions';
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import NumberFormat from 'react-number-format';

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";
import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import AddVehicule from '../mission/AddVehicule';
import VehiculeListItem from '../mission/VehiculeListItem';
import AnnonceListItem from '../annonce/AnnonceListItem';

class EditProposition extends Component {
  constructor(props) {
    super(props);

    this.state = {
        montent_t: null,
        annonce:null,
        vehicules:[],

        vehicule_all:null,
        vehiculeModalOpen: false,

        loading:false,
        validing:false,
        errors:null,
    };
  }

  componentDidMount()
  {
    this.detail();
    this.vehicule();
  }

  vehicule = () => {
    this.setState({loading:true});
    let { dispatch, history } = this.props;
    axios.get(APIModel.HOST + "vehicules/libre")
          .then(res => {
            this.setState({vehicule_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,dispatch,history)
          })
          .finally(() => this.setState({loading:false}));
  }

  addVehicule = (id) => {
    let {vehicules, vehicule_all} = this.state;
    if(vehicules.find(e => e.id === id))
    {
      this.removeVehicule(id);
    }else{
      vehicules = [...vehicules, vehicule_all.find(e => e.id === id)];
      this.setState({
        vehicules
      });
    }
    
  }

  removeVehicule = (id) => {
    let {vehicules} = this.state;
    vehicules = vehicules.filter(e => e.id !== id);
    this.setState({
      vehicules
    })
  }

  detail = () => {
    const { match: {params}, detailByAnnonceAndUser, dispatch, history, user} = this.props;
    detailByAnnonceAndUser(params.id, user.id)
    .then(res => {
      this.setState({annonce:res.data.annonce, montent_t:res.data.montant_t, vehicules:res.data.vehicules});
    }).catch(e => {
      msg.errorHandler(e,dispatch, history)
      this.props.history.push('/app/propostions');
    })
    .finally(() => this.setState({loading:false}));
  }


  handleNull = () => {
      this.setState({
        montent_t: "",
      });
  }

  toggleVehiculeModal = () => {
    this.setState({
      vehiculeModalOpen: !this.state.vehiculeModalOpen
    });
  };

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
      montent_t:value
    })
  }

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { match: {params}, edit, dispatch, history, user } = this.props;
    let {vehicules} = this.state;

    let vehicule_ids = [];

    vehicules.map(e => {
      vehicule_ids = [...vehicule_ids, e.id]
    });

    const options = {
      montant_t:this.state.montent_t,
      status:true,
      user_id: user.id,
      annonce_id: params.id,
      vehicule_ids:vehicule_ids,
    };
    //console.log(options);
    edit(params.id, user.id, options)
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
    const { annonce, vehicule_all, vehicules,  vehiculeModalOpen } = this.state;
    return (
<>
<Fragment>
  <Row className="">
    <Colxx xxs="12">
      <h1>
        <i className="simple-icon-plus heading-icon" />{" "}
        <span className="align-middle d-inline-block pt-1">
          Nouvelle Proposition
        </span>
      </h1>
      <div className="text-zero top-right-button-container">
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
      </div>
      
      <Breadcrumb match={this.props.match} />
      <Separator className="mb-5" />

        <Fragment>
          <Row>
              {
                annonce ?
                  <AnnonceListItem
                    data={annonce}
                    show={true}
                    hideProposition={true}
                    user={this.props.user} 
                  />
                :null
              }
              <Colxx xxs="12" lg="6" className="mb-4">
                <Card className="mb-4">
                  <CardBody>
                      <Row>
                        <Col sm={12}>
                          <Label className="form-group has-float-label">
                              <NumberFormat thousandSeparator={true} mask=" " value={parseFloat(this.state.montent_t)} customInput={Input} onValueChange={(values) => this.onValueChange(values)} />
                              <span>Montant *</span>
                              {
                                msg.fildsMsgHandler(this.state.errors,'montant_t')
                              }
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>    
                </Card>
              </Colxx>
              <Colxx xxs="12" lg="6" className="mb-4">
                <Card className="mb-4">
                  <CardBody>
                    <h2>Véhicules</h2>
                    {
                        vehicules ?
                        <>
                          {
                              vehicules.length > 0 ?
                              <>  
                                  {
                                      vehicules.map((r,i) => {
                                      return (
                                          <VehiculeListItem
                                              key={i} 
                                              data={r} 
                                              addVehicule={this.addVehicule}
                                              removeVehicule={this.removeVehicule}
                                              remove={true}
                                          />
                                      )
                                      })
                                  }    
                              </>
                              :null
                          }  
                          </>
                        :null
                    }
                    <Button Color="secondary" outline onClick={this.toggleVehiculeModal} className="mr-2">
                      Ajouter
                    </Button>
                  </CardBody>
                </Card>
              </Colxx>
          </Row>
    
        </Fragment>
      
    </Colxx>
  </Row>
</Fragment>

{
  vehicule_all ?
  <AddVehicule
    toggleModal={this.toggleVehiculeModal}
    modalOpen={vehiculeModalOpen}
    history={this.props.history}
    vehicule_all={vehicule_all}
    vehicules={vehicules}
    addVehicule={this.addVehicule}
    removeVehicule={this.removeVehicule}
  />
  :null
}

</>
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

export default connect(mapStateToProps, mapDispatchToProsps)(EditProposition);
