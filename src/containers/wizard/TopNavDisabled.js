import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import IntlMessages from "../../utils/IntlMessages";
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";

import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";


import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";

const selectData = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];


class TopNavDisabled extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",

      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      startDate: null,
      startDateLabelTop: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),

      startDateLabelOver: null,
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: []
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
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  handleTagChangeLabelOver = tagsLabelOver => {
    this.setState({ tagsLabelOver });
  };

  handleChangeDateLabelOver = date => {
    this.setState({
      startDateLabelOver: date
    });
  };

  handleChangeLabelOver = selectedOptionLabelOver => {
    this.setState({ selectedOptionLabelOver });
  };


  handleTagChange = tags => {
    this.setState({ tags });
  };

  

  handleTagChangeLabelTop = tagsLabelTop => {
    this.setState({ tagsLabelTop });
  };

  

  handleChangeLabelTop = selectedOptionLabelTop => {
    this.setState({ selectedOptionLabelTop });
  };

  handleChangeDateLabelTop = date => {
    this.setState({
      startDateLabelTop: date
    });
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Wizard>
        <TopNavigation className="justify-content-center" disableNav={true} topNavClick={this.topNavClick} />
        <Steps>
          <Step id="step1" name={messages["wizard.step-name-1"]} desc={messages["wizard.step-desc-1"]}>
            <div className="wizard-basic-step">
              <Form>
                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.name" />
                  </Label>
                  <Input type="text" name="name" placeholder={messages["forms.name"]} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                </FormGroup>
              </Form>
            </div>
          </Step>
          <Step id="step2" name={messages["wizard.step-name-2"]} desc={messages["wizard.step-desc-2"]}>
            <div className="wizard-basic-step">
              <Form>
                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.email" />
                  </Label>
                  <Input type="email" name="email" placeholder={messages["forms.email"]} value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                </FormGroup>
              </Form>
            </div>

          </Step>
          <Step id="step3" name={messages["wizard.step-name-3"]} desc={messages["wizard.step-desc-3"]}>

            <div className="wizard-basic-step">
              <Form>
                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.password" />
                  </Label>
                  <Input type="password" name="password" placeholder={messages["forms.password"]} value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                </FormGroup>
              </Form>
            </div>

          </Step>

          <Step id="step4" name={messages["wizard.step-name-4"]} desc={messages["wizard.step-desc-4"]}>

            <div className="wizard-basic-step">
              <Form>
                  <Label className="form-group has-float-label">
                    <Input type="email" />
                    <IntlMessages id="forms.email" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="password" />
                    <IntlMessages id="forms.password" />
                  </Label>
                  <div className="form-group has-float-label">
                    <TagsInput
                      value={this.state.tagsLabelOver}
                      onChange={this.handleTagChangeLabelOver}
                      inputProps={{ placeholder: "" }}
                    />
                    <IntlMessages id="forms.tags" />
                  </div>
                  <div className="form-group has-float-label">
                    <DatePicker
                      selected={this.state.startDateLabelOver}
                      onChange={this.handleChangeDateLabelOver}
                    />
                    <IntlMessages id="forms.date" />
                  </div>

                  <div className="form-group has-float-label">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={this.state.selectedOptionLabelOver}
                      onChange={this.handleChangeLabelOver}
                      options={selectData}
                      placeholder=""
                    />
                    <IntlMessages id="forms.state" />
                  </div>
                </Form>
            </div>

          </Step>

          <Step id="step5" hideTopNav={true}>
            <div className="wizard-basic-step text-center">
              <h2 className="mb-2"><IntlMessages id="wizard.content-thanks" /></h2>
              <p><IntlMessages id="wizard.registered" /></p>
          </div>
          </Step>
        </Steps>
        <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel={messages["wizard.prev"]} nextLabel={messages["wizard.next"]}/>
      </Wizard>
    );
  }
}
export default injectIntl(TopNavDisabled)
