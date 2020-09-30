import React from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker} from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from 'react-mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
//import 'react-mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

//mapboxgl.accessToken = 'pk.eyJ1Ijoib2ZmLWluaSIsImEiOiJjazdpMzdwenowZm9sM2ZvM3Y4NTJvbzIxIn0.eVWPpO-Cud_gJDpUetzB7Q';
const mapboxApiKey = 'pk.eyJ1Ijoib2ZmLWluaSIsImEiOiJjazdpMzdwenowZm9sM2ZvM3Y4NTJvbzIxIn0.eVWPpO-Cud_gJDpUetzB7Q';
const mapStyle = {
    width: '100%',
    height: 350
}
const geolocateStyle = {
  float: 'left',
  margin: '10px',
  padding: '10px'
};
const params = {
    country: "tg"
}

class MapBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
            latitude: 6.1470,
            longitude: 1.2522,
            zoom: 12
            },
            searchResultLayer: null,
            marker:{
              lat:0,
              lng:0,
              place:"",
              show:false
            }
        };
    }

  mapRef = React.createRef()

  componentDidMount() {
  
    /*const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [1.2522, 6.1470],
      zoom: 12
    });*/
  }

  handleViewportChange = viewport => {
    console.log({viewport});
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }

  onSelected = (viewport, item) => { 
    console.log({viewport, item});     
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
      }
    })
  }

  onClick = (viewport, item) => {
    console.log({viewport, item});
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
    console.log({viewport, item});
    this.setState({
      marker:{
        lat:viewport.coords.latitude,
        lng:viewport.coords.longitude,
        place:"",
        show:false
      }
    })
  }

  displayMArker = () =>{
    const  {marker} = this.state;
    return (
      <>
      {
        marker.show ?
        <Marker latitude={marker.lat} longitude={marker.lng} offsetLeft={-20} offsetTop={-10}>
          <img src="/assets/img/marker.png" alt="..." />
        </Marker>
        :
        null
      }
      </>
    )
  }

  render() {
      const {viewport, searchResultLayer} = this.state;
    return (
    <>
        {/*<Geocoder
            mapboxApiAccessToken={mapboxApiKey}
            onSelected={this.onSelected}
            viewport={viewport}
            hideOnSelect={true}
            value=""
            queryParams={params}
        /> */}
        <ReactMapGL
            mapboxApiAccessToken={mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={(viewport) => this.setState({viewport})}
            onClick={this.onClick}
            onDblClick={this.onDblClick}
        >
          <div style={{position: 'absolute', right: 0}}>
              <Geocoder
                mapRef={this.mapRef}
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
            />
          </div>
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            fitBoundsOptions={{maxZoom: 12}}
            trackUserLocation={true}
            label="Touver votre position"
            onGeolocate={this.onGeolocate}
          /> 

          {
            this.displayMArker()
          }

          {/*<Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={mapboxApiKey}
                position='top-right'
          />*/}
        </ReactMapGL>
        {/*<DeckGL {...viewport} layers={[searchResultLayer]} />*/}
    </>
    );
  }
}
export default MapBox;

