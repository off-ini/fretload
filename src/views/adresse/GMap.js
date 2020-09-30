import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '350px'
};

export class GMap extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showingInfoWindow: false,  
            activeMarker: {},          
            selectedPlace: {},        
        };
    }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={
          {
            lat: 6.137,
            lng: 1.21227
          }
        }
        centerAroundCurrentLocation={false}
        visible={true}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCULH1fyobJ43K8tdKZKgac2x8vAK6ggkc'
})(GMap);