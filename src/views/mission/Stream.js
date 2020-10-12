import React, { Component, Fragment } from "react";
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
import Select from "react-select";
import PubNubReact from "pubnub-react";

import CustomSelectInput from "../../components/common/CustomSelectInput";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import Map from './Map';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users:null,
        code:null,
        mission:null,
      /// Map State
        viewport: {
          latitude: 6.1470,
          longitude: 1.2522,
          zoom: 16
        },

        marker:{
          lat:0,
          lng:0,
          place:"",
          show:false
        },

        routes:{
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                
                ]
              }
            }
          ]
        },
      /////////////
        loading:false,
        validing:false,
        errors:null,
    };
    this.pubnub = new PubNubReact({
        publishKey: "pub-c-8e9946db-0fbb-439d-84ba-40fc4cd5ebdf",
        subscribeKey: "sub-c-9ecd0dda-ff33-11ea-81c8-6616e216ad91"
      });
    this.pubnub.init(this);
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value,
          routes: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": [
                  
                  ]
                }
              }
            ]
          }
      });
  }

  subscribeToPubNub = () => {
    this.pubnub.subscribe({
      channels: ['location'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      const { user, lat, lng } = msg.message;
      const {code} = this.state;
      console.log(user, lat, lng);
      if(code == user)
      {
        let coordinates = this.state.routes.features[0].geometry.coordinates;
        coordinates = [...coordinates, [lng,lat]];
        this.setState({
          viewport: {
              latitude: lat,
              longitude: lng,
              zoom: 16.5
          },
          marker:{
              lat:lat,
              lng:lng,
              place:"",
              show:true
          },
          routes: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": coordinates
                }
              }
            ]
          }
        })
      }else{
        this.setState({
          marker:{
              lat:0,
              lng:0,
              place:"",
              show:false
          },
          routes: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": [
                  
                  ]
                }
              }
            ]
          }
        })
      }
    });
  };

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
    this.detail();
    this.subscribeToPubNub();
  }

  detail = () => {
    const { match: {params}, detail, history} = this.props;
    detail(params.id)
    .then(res => {
        this.setState({mission:res.data}, () => {
            const {mission} = this.state;
            let code = 0;
            if(mission.chauffeurs)
            {
                if(mission.chauffeurs[0])
                {
                    code = mission.chauffeurs[0].code
                }
            }
            this.setState({code});
        });
    }).catch(e => {
      msg.errorHandler(e,null,null)
      history.push('/app/missions');
    })
    .finally(() => this.setState({loading:false}));
  }

  get = () => {
    const {missions, match: {params}, history} = this.props;
    console.log({p:params.id, missions});
    const mission = missions.find( v => v.id === params.id);
    if(mission)
    {
        this.setState({mission}, () => {
            let code = 0;
            if(mission.chauffeurs)
            {
                if(mission.chauffeurs[0])
                {
                    code = mission.chauffeurs[0].code
                }
            }
            this.setState({code});
        });
    }else{
        history.push('/app/missions');
    }
  }

  componentWillUnmount(){

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
          Suivi de Mission
        </span>
      </h1>
      <div className="text-zero top-right-button-container">
      </div>
      
      <Breadcrumb match={this.props.match} />
      <Separator className="mb-5" />

        <Fragment>
          <Row>
           <Colxx xxs="12" lg="12" className="mb-4">
                <Map 
                    viewport={this.state.viewport}
                    marker={this.state.marker}
                    routes={this.state.routes}
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
    user: state.AuthReducer.user
  }
}

  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      detail: (id) => actionsCreator.detail(id)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(Tracker);
