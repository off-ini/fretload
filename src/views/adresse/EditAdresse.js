import React, { Component, Fragment } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AdresseActions';
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import Select from "react-select";

import CustomSelectInput from "../../components/common/CustomSelectInput";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import Map from './Map';

class EditAdresse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description:null,
      pays: null,
      ville: null,
      adresse: null,
      pays_all:null,

    /// Map State
      viewport: {
        latitude: 6.1470,
        longitude: 1.2522,
        zoom: 12
      },

      marker:{
        lat:0,
        lng:0,
        place:"",
        show:false
      },
    /////////////

      loading:false,
      validing:false,
      errors:null,
    };
  }

  handleNull = () => {
    this.setState({
      name: "",
      description:"",
      adresse: "",
    });
  }

  //// Map Function

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  onSelected = (viewport, item) => {      
    this.setState({
      viewport:{
        latitude:viewport.latitude,
        longitude:viewport.longitude,
        zoom: 12
      },
      marker:{
        lat:viewport.latitude,
        lng:viewport.longitude,
        place:item.place_name,
        show:true
      },
      adresse:item.place_name
    })
  }

  onClick = (viewport, item) => {
    this.setState({
      marker:{
        lat:viewport.lngLat[1],
        lng:viewport.lngLat[0],
        place:"",
        show:true
      }
    })
  }

  onDblClick = (viewport, item) => {
    this.setState({
      marker:{
        lat:0,
        lng:0,
        place:"",
        show:false
      }
    })
  }

  onGeolocate = (viewport, item) => {
    this.setState({
      marker:{
        lat:viewport.coords.latitude,
        lng:viewport.coords.longitude,
        place:"",
        show:false
      }
    })
  }

  handleAdresse = (adresse) => {
    this.setState({adresse});
  }

  ////////////////

  componentDidMount()
  {
    this.pays();
    this.get();
    this.detail();
  }

  componentWillReceiveProps(nextProps) {
    this.get();
    this.detail();
  }
  

  pays = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "pays")
          .then(res => {
            this.setState({pays_all:res.data.data});
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  setValues = (res) =>{
    this.setState({
        name: res.name,
        description:res.description,
        pays: res.pays,
        ville: res.ville,
        adresse: res.adresse,

        marker:{
          lat:res.latitude,
          lng:res.logitude,
          place:"",
        },
    })
  } 

  get = () => {
    const {adresses, match: {params}} = this.props;
    const adresse = adresses.find( v => v.id === params.id);
    if(adresse)
    {
        this.setValues(adresse)
    }
  }

  detail = () => {
    const { match: {params}, detail, dispatch, history} = this.props;
    detail(params.id)
    .then(res => {
      this.setValues(res.data)
    }).catch(e => {
      msg.errorHandler(e,dispatch, history)
      this.props.history.push('/app/adresses');
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

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data, errors:null });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    let { match: {params}, edit, dispatch, history, user } = this.props

    const options = {
      name: this.state.name,
      description: this.state.description,
      ville_id: this.state.ville?this.state.ville.id:null,
      adresse: this.state.adresse,
      logitude: this.state.marker.lng,
      latitude: this.state.marker.lat,
      user_id: user.id,
    };
    //console.log(options);
    edit(params.id, options)
    .then(res => {
        dispatch({
          type:actions.EDIT_ADRESSE, 
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
  return (
<>
<Fragment>
  <Row className="">
    <Colxx xxs="12">
      <h1>
        <i className="simple-icon-plus heading-icon" />{" "}
        <span className="align-middle d-inline-block pt-1">
          Modifier Adresse
        </span>
      </h1>
      <div className="text-zero top-right-button-container">
      <Button Color="secondary" outline >
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
              <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                  <CardBody>
                  <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                            <Input type="text" name="name" value={this.state.name} onChange={this.handleChange}  invalid/>
                            <span>Libelle *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'name')
                            }
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-group has-float-label">
                            <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isLoading={this.state.loading}
                                name="pays"
                                value={this.state.pays}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.pays_all}
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
                                isLoading={this.state.loading}
                                name="ville"
                                value={this.state.ville}
                                onChange={this.handleChangeLabelOver}
                                options={this.state.pays ? this.state.pays.villes : null}
                                placeholder=""
                            />
                            <span>Ville *</span>
                            {
                              msg.fildsMsgHandler(this.state.errors,'ville_id')
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="latitude" value={this.state.marker.lat} readOnly />
                          <span>Latitude</span>
                        </Label>
                    </Col>

                    <Col sm={6}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="longitude" value={this.state.marker.lng} readOnly />
                          <span>Longitude</span>
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Label className="form-group has-float-label">
                          <Input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} />
                            <span>Adresse</span>
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
              <Colxx xxs="12" lg="8" className="mb-4">
                   <Map 
                      viewport={this.state.viewport}
                      marker={this.state.marker}
                      onClick={this.onClick}
                      onDblClick={this.onDblClick}
                      onSelected={this.onSelected}
                      onGeolocate={this.onGeolocate}
                      handleAdresse={this.handleAdresse}
                   />
              </Colxx>
          </Row>
    
        </Fragment>
      
    </Colxx>
  </Row>
</Fragment>

</>
  );
  }
}

  const mapStateToProps = state => {
    return {
      adresses: state.AdresseReducer.adresses,
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

export default connect(mapStateToProps, mapDispatchToProsps)(EditAdresse);
