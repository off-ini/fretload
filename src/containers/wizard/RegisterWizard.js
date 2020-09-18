import React, { Component } from "react";
import { Row, Col,Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
//import { TopNavigation } from "../../components/wizard/TopNavigation";
import * as msg from '../../utils/messages';


import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";

import sexe from '../../data/sex';
import {day, mounth, year} from '../../data/birthday';

class RegisterWizard extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
        ended:false,
    }
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }

    if(steps.length - 2 <= steps.indexOf(step))
    {
        this.setState({ended:true})
    }else{
        this.setState({ended:false})
    }
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    this.setState({ended:false})
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  handleChangeLabelOver = selectedOptionLabelOver => {
    this.setState({ selectedOptionLabelOver });
  };


  render() {
    const { messages } = this.props.intl;
    return (
      <Wizard>
        {/*<TopNavigation className="justify-content-center" disableNav={true} topNavClick={this.topNavClick} />*/}
        <Steps>
          <Step id="step1" name={messages["wizard.step-name-1"]} desc={messages["wizard.step-desc-1"]}>
            <div className="wizard-basic-step">
                <Row>
                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="f_name" value={this.props.f_name} onChange={this.props.handleChange} />
                            <span>Prénom *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'f_name')
                            }
                        </Label>
                    </Col>
                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="name" value={this.props.name} onChange={this.props.handleChange} />
                            <span>Nom *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'name')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="day"
                                        value={this.props.day}
                                        onChange={this.props.handleChangeLabelOver}
                                        options={day}
                                        placeholder=""
                                    />
                                    <span>Jour *</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="mounth"
                                        value={this.props.mounth}
                                        onChange={this.props.handleChangeLabelOver}
                                        options={mounth}
                                        placeholder=""
                                    />
                                <span>Mois *</span>
                                {
                                msg.fildsMsgHandler(this.props.errors,'naissance')
                                }
                                </div>
                            </Col>
                            <Col sm={4} md={4} xl={4} xs={4}>
                                <div className="form-group has-float-label">
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="year"
                                        value={this.props.year}
                                        onChange={this.props.handleChangeLabelOver}
                                        options={year}
                                        placeholder=""
                                    />
                                    <span>Année *</span>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="sexe"
                                value={this.props.sexe}
                                onChange={this.props.handleChangeLabelOver}
                                options={sexe}
                                placeholder=""
                            />
                            <span>Sexe *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'sexe')
                            }
                        </div>
                    </Col>
                </Row>
            </div>
          </Step>
          <Step id="step2" name={messages["wizard.step-name-2"]} desc={messages["wizard.step-desc-2"]}>
            <div className="wizard-basic-step">
                <Row>
                    <Col sm={6}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.props.loading}
                                name="pays"
                                value={this.props.pays}
                                onChange={this.props.handleChangeLabelOver}
                                options={this.props.pays_all}
                                placeholder=""
                            />
                            <span>Pays *</span>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.props.loading}
                                name="ville"
                                value={this.props.ville}
                                onChange={this.props.handleChangeLabelOver}
                                options={this.props.pays ? this.props.pays.villes : null}
                                placeholder=""
                            />
                            <span>Ville *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'ville')
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} md={3} xl={3} xs={3}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="phonecode" value={this.props.phone_code ? '+'+this.props.phone_code : ''} readOnly/>
                            <span>Code</span>
                        </Label>
                    </Col>
                    <Col sm={9} md={9} xl={9} xs={9}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="phone" value={this.props.phone} onChange={this.props.handleChange} />
                            <span>Téléphone *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'phone')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="email" name="email" value={this.props.email} onChange={this.props.handleChange} />
                            <span>Email *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'email')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="adresse" value={this.props.adresse} onChange={this.props.handleChange} />
                            <span>Adresse</span>
                        </Label>
                    </Col>
                </Row>
            </div>

          </Step>
          <Step id="step3" name={messages["wizard.step-name-3"]} desc={messages["wizard.step-desc-3"]}>

            <div className="wizard-basic-step">
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
                            <span>Nom d'utilisateur *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'username')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
                            <span>Mot de passe *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'password')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="password" name="c_password" value={this.props.c_password} onChange={this.props.handleChange} />
                            <span>Confirmer mot de passe *</span>
                            {
                              msg.fildsMsgHandler(this.props.errors,'c_password')
                            }
                        </Label>
                    </Col>
                </Row>
            </div>

          </Step>

         {/* <Step id="step4" hideTopNav={true}>
            <div className="wizard-basic-step text-center">
              <h2 className="mb-2"><IntlMessages id="wizard.content-thanks" /></h2>
              <p><IntlMessages id="wizard.registered" /></p>
          </div>
            </Step>*/}
        </Steps>
        <BottomNavigation onClickNext={this.state.ended ? this.props.handleSubmit : this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel="Précedent" nextLabel={this.state.ended ? "Valider" : "Suivant" }/>
      </Wizard>
    );
  }
}
export default injectIntl(RegisterWizard)
