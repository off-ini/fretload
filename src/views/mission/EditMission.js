import React, { Component,Fragment } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MissionActions';
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardBody,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { Colxx } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import MarchandiseListItem from './MarchandiseListItem';
import UserListItem from './UserListItem';
import DestinataireListItem from './DestinataireListItem';
import AdresseListItem from './AdresseListItem';
import AddVehicule from './AddVehicule';
import VehiculeListItem from './VehiculeListItem';
import AddChauffeur from './AddChauffeur';
import ChauffeurListItem from './ChauffeurListItem';

class AddMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: null,
        description:null,
        montant: null,
        date_depart_pre: null,
        date_arriver_pre: null,
        vehicules:[],
        chauffeurs:[],

        embeddedDate: moment(),

        vehicule_all:null,
        chauffeur_all:null,
        proposition:null,
        mission:null,

        loading:false,
        validing:false,
        errors:null,

        activeFirstTab: "1",
        vehiculeModalOpen: false,
        chauffeurModalOpen: false,
    };
  }

  handleNull = () => {
      this.setState({
        title: "",
        description:"",
        date_depart_pre: null,
        date_arriver_pre: null,
        chauffeurs: [],
        vehicules: []
      });
  }

  componentDidMount()
  {
    this.detail();
    this.vehicule();
    this.chauffeur();
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  toggleVehiculeModal = () => {
      this.setState({
        vehiculeModalOpen: !this.state.vehiculeModalOpen
      });
  };

  toggleChauffeurModal = (id) => {
    this.setState({
      id:id,
    }, () => {
      this.setState({chauffeurModalOpen: !this.state.chauffeurModalOpen})
    });
  };

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

  chauffeur = () => {
    let { dispatch, history } = this.props;
    this.setState({loading:true});
    axios.get(APIModel.HOST + "users/chauffeurs/libre")
          .then(res => {
            this.setState({chauffeur_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,dispatch,history)
          })
          .finally(() => this.setState({loading:false}));
  }

  addChauffeur = (id) => {
    let {chauffeurs, chauffeur_all} = this.state;
    if(chauffeurs.find(e => e.id === id))
    {
      this.removeChauffeur(id);
    }else{
      chauffeurs = [...chauffeurs, chauffeur_all.find(e => e.id === id)];
      this.setState({
        chauffeurs
      });
    }
    
  }

  removeChauffeur = (id) => {
    let {chauffeurs} = this.state;
    chauffeurs = chauffeurs.filter(e => e.id !== id);
    this.setState({
      chauffeurs
    })
  }

  setValues = (res) =>{
    this.setState({
        title: res.title,
        description:res.description,
        montant: res.montant,
        date_depart_pre: new Date(res.date_depart_pre),
        date_arriver_pre: new Date(res.date_arriver_pre),
        vehicules:res.vehicules,
        chauffeurs:res.chauffeurs,
    })
  } 

  detail = () => {
    const { match: {params}, detail} = this.props;
    detail(params.id)
    .then(res => {
      this.setState({mission:res.data,proposition:res.data.proposition}, () => {
        this.setValues(this.state.mission);
      });
    }).catch(e => {
      msg.errorHandler(e,null,null)
      this.props.history.push('/app/propostions');
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

  handleChangeStart = date => {
    this.setState({
      date_depart_pre: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      date_arriver_pre: date
    });
  };

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { edit, dispatch, history, user } = this.props;
    let {proposition, vehicules, chauffeurs, mission} = this.state;
    let vehicule_ids = [];
    let chauffeur_ids= [];

    vehicules.map(e => {
      vehicule_ids = [...vehicule_ids, e.id]
    });

    chauffeurs.map(e => {
      chauffeur_ids = [...chauffeur_ids, e.id]
    });

    const options = {
      title: this.state.title,
      description: this.state.description,
      montant: this.state.montant,
      date_depart_pre: this.state.date_depart_pre,
      date_arriver_pre: this.state.date_arriver_pre,
      marchandise_id: proposition ? proposition.annonce.marchandise.id :null,
      destinataire_id: proposition ? proposition.annonce.marchandise.destinataire.id :null,
      proposition_id: proposition ? proposition.id :null,
      user_p_id: proposition ? proposition.annonce.owner.id :null,
      user_id: user.id,
      chauffeur_ids,
      vehicule_ids
    };
    //console.log(options);
    edit(mission.id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_MISSION, 
          payload:res.data
        });
        msg.successHandler(msg.SUCCESS_TITLE, msg.EDIT_SUCCESS);
    })
    .catch(e => {
      msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.EDIT_ERROR);
      this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }


  render() {
    const { proposition, vehicule_all, vehicules, chauffeur_all, chauffeurs, vehiculeModalOpen, chauffeurModalOpen } = this.state;
    return (
<>
      <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <h1>
              <i className="simple-icon-pincel heading-icon" />{" "}
              <span className="align-middle d-inline-block pt-1">
                Modifier Mission
              </span>
            </h1>
            <div className="text-zero top-right-button-container">
              {
                this.state.activeFirstTab === '2' ?
                  <div className="mt-2">
                    <Button Color="secondary" outline  className="mr-2">
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
                :null
              }
            </div>
            
            <Breadcrumb match={this.props.match} />
            
              <Fragment>
                <Nav tabs className="separator-tabs ml-0 mb-5">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                      to="#">
                      Détail
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "2",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("2");
                      }}
                      to="#">
                     Modifier
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeFirstTab} >
                  <TabPane tabId="1">
                    <Row >
                        <Colxx xxs="12" lg="4" className="mb-4">
                          {
                            proposition ?
                              <MarchandiseListItem
                                data={proposition.annonce.marchandise}
                              />
                            :null
                          }
                        </Colxx>
                        <Colxx xxs="12" lg="8" className="mb-4">
                          <Row>
                              <Colxx xxs="12" lg="6" >
                              {
                                proposition ?
                                  <AdresseListItem
                                    data={proposition.annonce.marchandise.adresse_depart}
                                    type="Adresse Départ"
                                  />
                                :null
                              }
                              </Colxx>
                              <Colxx xxs="12" lg="6" >
                              {
                                proposition ?
                                  <AdresseListItem
                                    data={proposition.annonce.marchandise.adresse_arriver}
                                    type="Adresse Arrivée"
                                  />
                                :null
                              }
                              </Colxx>

                              <Colxx xxs="12" lg="6" >
                              {
                                proposition ?
                                  <UserListItem 
                                    data={proposition.annonce.owner}
                                    type="propriétaire"
                                  />
                                :null
                              }
                              </Colxx>

                              <Colxx xxs="12" lg="6" >
                              {
                                proposition ?
                                  <DestinataireListItem 
                                    data={proposition.annonce.marchandise.destinataire}
                                    type="Destinataire"
                                  />
                                :null
                              }
                              </Colxx>
                          </Row>
                        </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2" >
                    <Row>
                        <Colxx xxs="12" lg="6" className="mb-4">
                          <Card className="mb-4">
                            <CardBody>
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
                                    <Col sm={12}>
                                        <Label className="form-group has-float-label">
                                            <Input type="text" name="montant" value={this.state.montant} onChange={this.handleChange} />
                                            <span>Montant *</span>
                                            {
                                              msg.fildsMsgHandler(this.state.errors,'montant')
                                            }
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6} md={6} xl={6} xs={6}>
                                        <Label className="form-group has-float-label">
                                        <DatePicker
                                          selected={this.state.date_depart_pre}
                                          selectsStart
                                          startDate={this.state.date_depart_pre}
                                          endDate={this.state.date_arriver_pre}
                                          onChange={this.handleChangeStart}
                                          placeholderText=""
                                        />
                                            <span>Date Départ *</span>
                                            {
                                              msg.fildsMsgHandler(this.state.errors,'date_depart_pre')
                                            }
                                        </Label>
                                    </Col>

                                    <Col sm={6} md={6} xl={6} xs={6}>
                                        <Label className="form-group has-float-label">
                                        <DatePicker
                                          selected={this.state.date_arriver_pre}
                                          selectsEnd
                                          startDate={this.state.date_depart_pre}
                                          endDate={this.state.date_arriver_pre}
                                          onChange={this.handleChangeEnd}
                                          placeholderText=""
                                        />
                                            <span>Date Arrivée *</span>
                                            {
                                              msg.fildsMsgHandler(this.state.errors,'date_arriver_pre')
                                            }
                                        </Label>
                                    </Col>
                                    <Col sm={12}>
                                        <Label className="form-group has-float-label">
                                            <textarea name="description" style={{width:'100%'}} onChange={this.handleChange} rows={4} >{this.state.description}</textarea>
                                            <span>Description</span>
                                        </Label>
                                    </Col>
                                </Row>
                               </CardBody>    
                          </Card>
                        </Colxx>
                        <Colxx xxs="12" lg="6" className="mb-4">
                          <Card className="mb-4">
                            <CardBody>
                              <h2>Chauffeurs</h2>
                              {
                                  chauffeurs ?
                                  <>
                                    {
                                        chauffeurs.length > 0 ?
                                        <>  
                                            {
                                                chauffeurs.map((r,i) => {
                                                return (
                                                    <ChauffeurListItem
                                                        key={i} 
                                                        data={r} 
                                                        addChauffeur={this.addChauffeur}
                                                        removeChauffeur={this.removeChauffeur}
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
                              <Button Color="secondary" outline onClick={this.toggleChauffeurModal} className="mr-2">
                                Ajouter
                              </Button>
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
                  </TabPane>
                </TabContent>
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

{
        chauffeur_all ?
        <AddChauffeur
          toggleModal={this.toggleChauffeurModal}
          modalOpen={chauffeurModalOpen}
          history={this.props.history}
          chauffeur_all={chauffeur_all}
          chauffeurs={chauffeurs}
          addChauffeur={this.addChauffeur}
          removeChauffeur={this.removeChauffeur}
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
      edit: (id, data) => actionsCreator.edit(id, data),
      detail: (id) => actionsCreator.detail(id)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(AddMission);
