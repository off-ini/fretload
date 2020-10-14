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
  Card,
  CardBody,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactToPrint, { PrintContextConsumer } from 'react-to-print';


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

const getDate = (d) =>
{
  const months = ["Janvier", "Fevier", "Mars","Avril", "Mai", "Jun", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
  let current_datetime = new Date(d)
  return current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
}

class AddMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
        vehicule_all:null,
        chauffeur_all:null,
        mission:null,

        loading:false,
        validing:false,
        errors:null,


    };
  }

  componentDidMount()
  {
    this.detail();
    this.vehicule();
    this.chauffeur();
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


  setValues = (res) =>{
    this.setState({
        mission:res
    })
  } 

  detail = () => {
    const { match: {params}, detail} = this.props;
    detail(params.id)
    .then(res => {
      this.setState({mission:res.data});
    }).catch(e => {
      msg.errorHandler(e,null,null)
      this.props.history.push('/app/missions');
    })
    .finally(() => this.setState({loading:false}));
  }



  render() {
    const { mission } = this.state;
    return (
<>
      <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <h1>
              <i className="simple-icon-pincel heading-icon" />{" "}
              <span className="align-middle d-inline-block pt-1">
                Rapport de Mission
              </span>
            </h1>
            <div className="text-zero top-right-button-container">
              
                  <div className="mt-2">
                  <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <Button 
                          Color="primary" 
                          className={`btn-shadow btn-multiple-state ${this.state.validing ? "show-spinner" : ""}`}
                          onClick={handlePrint}>
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        <span className="label">Imprimer</span>
                      </Button>
                      )}
                    </PrintContextConsumer>
                </ReactToPrint>
                    
                  </div>
            </div>
            
            <Breadcrumb match={this.props.match} />

            <Separator className="mb-5" />
                {
                  mission ?
                <Fragment>
                  <Card ref={el => (this.componentRef = el)} >
                  <Row className="m-2">
                        <Colxx xxs="12" lg="12" className="mb-4">
                          <h1>Mission N-{ mission.id } : {mission.title}</h1>
                        </Colxx>
                        <Colxx xxs="12" lg="12" className="mb-4">
                          <Row>
                              <Colxx xxs="12" lg="12" >
                                <Row>
                                <Colxx xxs="4" lg="4" >
                                  <h3>Destinataire</h3>
                                  <h5>Nom : {mission.destinataire.name}</h5>
                                  <h5>Prenom : {mission.destinataire.f_name}</h5>
                                  <h5>Téléphone : {mission.destinataire.phone}</h5>
                                  <h5>Email : {mission.destinataire.email}</h5>
                                </Colxx>
                                <Colxx xxs="4" lg="4" >
                              
                                </Colxx>
                                <Colxx xxs="4" lg="4" >
                                  <h3>Propriétaire</h3>
                                  <h5>Nom : {mission.proposition.annonce.owner.name}</h5>
                                  <h5>Prenom : {mission.proposition.annonce.owner.f_name}</h5>
                                  <h5>Téléphone : {mission.proposition.annonce.owner.phone}</h5>
                                  <h5>Email : {mission.proposition.annonce.owner.email}</h5>
                                </Colxx>
                                </Row>
                              </Colxx>
                              <Colxx md="6" sm="6" lg="6" xxs="12" >
                                {
                                    mission.proposition ?
                                    <>
                                      <AdresseListItem
                                        data={mission.proposition.annonce.marchandise.adresse_depart}
                                        type="Adresse Départ"
                                      />
                                    </>
                                    :null
                                }
                              </Colxx>
                              <Colxx md="6" sm="12" lg="6" xxs="12" >
                                {
                                  mission.proposition ?
                                  <>
                                    <AdresseListItem
                                      data={mission.proposition.annonce.marchandise.adresse_arriver}
                                      type="Adresse Arrivée"
                                    />
                                    </>
                                  :null
                              }  
                            </Colxx>
                              <Colxx xxs="12" lg="12" >
                              <Row>
                                <Colxx xxs="4" lg="4" >
                                  <h3></h3>
                                  <h5>Date départ prévu : {getDate(mission.date_depart_pre)}</h5>
                                  <h5>Date arrivée prévu : {getDate(mission.date_arriver_pre)}</h5>
                                </Colxx>
                                <Colxx xxs="4" lg="4" >
                              
                                </Colxx>
                                <Colxx xxs="4" lg="4" >
                                  <h3></h3>
                                  <h5>Date départ effectif: {getDate(mission.date_depart_eff)}</h5>
                                  <h5>Date départ effectif : {getDate(mission.date_arriver_eff)}</h5>
                                  
                                </Colxx>
                                </Row>
                              </Colxx>
                                <Colxx md="6" sm="6" lg="6" xxs="12" >
                                {
                                    mission.chauffeurs ?
                                    <>
                                      {
                                          mission.chauffeurs.length > 0 ?
                                          <>  
                                              {
                                                  mission.chauffeurs.map((r,i) => {
                                                  return (
                                                      <ChauffeurListItem
                                                          key={i} 
                                                          data={r} 
                                                          remove={false}
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
                              </Colxx>
                              <Colxx md="6" sm="12" lg="6" xxs="12" >
                                {
                                  mission.vehicules ?
                                  <>
                                    {
                                        mission.vehicules.length > 0 ?
                                        <>  
                                            {
                                                mission.vehicules.map((r,i) => {
                                                return (
                                                    <VehiculeListItem
                                                        key={i} 
                                                        data={r} 
                                                        remove={false}
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
                            </Colxx>

                              <Colxx xxs="12" lg="6" >
                              
                              </Colxx>

                              <Colxx xxs="12" lg="6" >
                              
                              </Colxx>
                          </Row>
                        </Colxx>
                    </Row>
                  </Card>
              </Fragment>
            
                  :null
                }
              
          </Colxx>
        </Row>
      </Fragment>
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
