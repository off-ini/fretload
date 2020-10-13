import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MissionActions';

import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigationM } from "../../components/wizard/BottomNavigationM";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import DropZone from "../../components/DropZone";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";
import Can from '../../config/Can';

const steps = [
  {id:"step1", desc:"", name:"Chargement"},
  {id:"step2", desc:"", name:"Livraison"},
  {id:"step3", desc:"", name:"Paiement"},
  {id:"step4",},
];

class TopNavDisabled extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      bordoreau_l: null,
      bordoreau_c: null,
      code_livraison: "",

      charger:false,
      livrer:false,
      payer:false,

      step:0,

      mission:null,
      errors:null,
      validing:false,
    }
  }

  componentDidMount = () => {
      this.get();
  }

  handleChargement = () => {
    this.setState({validing:true});

    let { dispatch, history, user } = this.props;
    let {mission} = this.state;

    const options = {
      bordoreau_c: this.state.bordoreau_c,
      user_id: user.id,
    };

    axios
    .post(APIModel.HOST + "missions/up/encours/"+mission.id, options)
    .then(res => {
        dispatch({
            type:actions.EDIT_MISSION, 
            payload:res.data
        });
        this.setState({chrger:true});
        msg.successHandler(msg.SUCCESS_TITLE, msg.ADD_SUCCESS);
    })
    .catch(e => {
        msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.ADD_ERROR);
        this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }

  handleLivraison = () => {
    this.setState({validing:true});

    let { dispatch, history, user } = this.props;
    let {mission} = this.state;

    const options = {
      code_livraison:this.state.code_livraison,
      bordoreau_l: this.state.bordoreau_l,
      user_id: user.id,
    };

    axios
    .post(APIModel.HOST + "missions/up/livrer/"+mission.id, options)
    .then(res => {
        dispatch({
            type:actions.EDIT_MISSION, 
            payload:res.data
        });
        this.setState({livrer:true});
        msg.successHandler(msg.SUCCESS_TITLE, msg.ADD_SUCCESS);
    })
    .catch(e => {
        msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.ADD_ERROR);
        this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    this.getStep(steps.indexOf(step) + 1);
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    this.getStep(steps.indexOf(step) - 1);
    goToPrev();
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value,
          errors:null
      })
  }

  get = () => {
    const {missions, id} = this.props;
    const mission = missions.find( v => v.id === id);
    if(mission)
    {
        this.setState({mission},()=>{
          const {mission} = this.state;
            if(mission.status == 1){
              this.setState({charger:true});
            }
            if(mission.status == 2){
              this.setState({livrer:true});
            }
            if(mission.status == 3){
              this.setState({payer:true});
            }
        });
    }
  }

  handleFile_l = (file) => {
    this.createImage('bordoreau_l', file);
  }

  removeFile_l = (file) => {
    this.setState({bordoreau_l:null});
  }

  handleFile_c = (file) => {
    this.createImage('bordoreau_c', file);
  }

  removeFile_c = (file) => {
    this.setState({bordoreau_c:null});
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

  getStep = (step) => {
    this.setState({step});
  }

  paiding = () => {
    let { dispatch, history, user } = this.props;
    let {mission} = this.state;

    axios
    .post(APIModel.HOST + "missions/paiding/"+user.id+"/"+mission.id)
    .then(res => {
      let identifier = new Date().getTime();
      window.location.replace("https://paygateglobal.com/v1/page?token=44e087cf-2a90-4bf9-85af-3634a2054e73&amount=1&identifier="+identifier+"&url="+APIModel.HOST + "payements");
    })
    .catch(e => {
        msg.errorHandler(e, dispatch, history);
        this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }

  displayBouton = () => {
    const {mission, charger, livrer , payer, step} = this.state;

    if(step == 0 && (mission.status == 0 && !charger))
    {
      return (
        <Can I="button" a="charger">
          <BottomNavigationM onClickNext={this.handleChargement} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Valider"/>
        </Can>
      )
    }else if(step == 0 && charger)
    {
      return (
        <Can I="button" a="next">
          <BottomNavigationM onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Suivant"/>
        </Can>
      )
    }else{
        if(step == 1 && (mission.status == 1 && !livrer))
        {
          return (
            <Can I="button" a="livrer">
              <BottomNavigationM onClickNext={this.handleLivraison} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Valider"/>
            </Can>
          )
        }else if(step == 1 && livrer)
        {
          return (
            <Can I="button" a="next">
              <BottomNavigationM onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Suivant"/>
            </Can>
          )
        }else{
            if(step == 2 && (mission.status == 2 && !payer))
            {
              return (
                <Can I="button" a="payer">
                  {/*<BottomNavigationM onClickNext={() => this.props.togglePayementModal(mission.id)} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Valider"/>*/}
                  <BottomNavigationM onClickNext={() => this.paiding()} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Valider"/>
                </Can>
              )
            }else if(step == 2 && payer)
            {
              return (
                <BottomNavigationM onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Terminer" Nextdisable={true}/>
              )
            }else{
              return (
                <Can I="button" a="next">
                  <BottomNavigationM onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précédent" nextLabel="Suivant"/>
                </Can>
              )
            } 
        }
    }
  }

  render() {
    const {mission} = this.state;
    return (
      <Card>
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav={true} topNavClick={this.topNavClick} index={mission ? mission.status: 0} />
            <Steps >
              <Step id="step1" name="Chargement" desc="">
                <Can I="action" a="charger">
                  {
                    mission && mission.status == 0 ?
                    <div className="wizard-basic-step">
                      <Form>
                        <FormGroup>
                            <Label className="form-group has-float-label">
                                <DropZone
                                    handleFile={this.handleFile_c}
                                    removeFile={this.removeFile_c}
                                />
                                <span>Bordoreau de Chargement</span>
                            </Label>
                        </FormGroup>
                      </Form>
                    </div>
                    :null
                  } 
                </Can>
              </Step>
              <Step id="step2" name="Livraison" desc="" >
                <Can I="action" a="livrer">
                  {
                    mission && mission.status == 1 ?
                      <div className="wizard-basic-step">
                        <Form>
                          <FormGroup>
                              <Label className="form-group has-float-label">
                                  <Input type="text" name="code_livraison" value={this.state.code_livraison} onChange={this.handleChange} />
                                  <span>Code de Livraison *</span>
                                  {
                                    msg.fildsMsgHandler(this.state.errors,'code_livraison')
                                  }
                              </Label>
                              <Label className="form-group has-float-label">
                                  <DropZone
                                      handleFile={this.handleFile_l}
                                      removeFile={this.removeFile_l}
                                  />
                                  <span>Bordoreau de Livraison</span>
                              </Label>
                          </FormGroup>
                        </Form>
                      </div>
                    :null
                  } 
                </Can>
              </Step>

              <Step id="step3" name="Paiement" desc="" >
                <Can I="action" a="livrer">
                  <div className="wizard-basic-step">
                      <Form>
                        <FormGroup>
                        </FormGroup>
                      </Form>
                  </div>
                </Can>
              </Step>

              <Step id="step4" hideTopNav={true} >
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">Mission Terminer et Payer</h2>
              </div>
              </Step>

            </Steps>
            {
              mission ?
                this.displayBouton()
              :null
            }
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
    return {
        missions: state.MissionReducer.missions,
        user: state.AuthReducer.user
    }
}
  
const mapDispatchToProsps = dispatch => {
    return {
        dispatch:dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProsps)(TopNavDisabled);
