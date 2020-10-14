import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'react-map-gl-directions/dist/mapbox-gl-directions.css';

import React from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl, Marker, Source, Layer} from 'react-map-gl';
import Directions from 'react-map-gl-directions';
import DeckGL, { GeoJsonLayer } from "deck.gl";
//import Geocoder from 'react-mapbox-gl-geocoder';


const mapboxApiKey = 'pk.eyJ1Ijoib2ZmLWluaSIsImEiOiJjazdpMzdwenowZm9sM2ZvM3Y4NTJvbzIxIn0.eVWPpO-Cud_gJDpUetzB7Q';

const mapStyle = {
    width: '100%',
    height: 500
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
                zoom: 15
            },
            searchResultLayer: null,
            marker:{
              lat:0,
              lng:0,
              place:"",
              show:false
            },
            routes : {
              "type": "FeatureCollection",
              "features": [
                {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [
                      [
                        1.2522,
                        6.1470
                      ],
                      [
                        1.2523,
                        6.1471
                      ],
                    ]
                  }
                }
              ]
            },
        };
    }

  mapRef = React.createRef();

  componentWillReceiveProps = (nextProps) => {
    this.setState({viewport:nextProps.viewport, marker:nextProps.marker, routes:nextProps.routes});
  };
  

  handleViewportChange = viewport => {
    this.setState({
      viewport
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
    const { handleAdresse } = this.props;
    handleAdresse(item.place_name);
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
    });
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

  displayMArker = () =>{
    //const  {marker} = this.state;
    const {marker} = this.state;
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

  displaySource = () => {
    const { routes } = this.state;
    return(
      <>
      <Source id="my-data" type="geojson" data={routes}>
        <Layer
          id="point"
          type="line"
          layout={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={{
            'line-color': '#007cbf',
            'line-width': 4
          }}
          /*paint={{
            'circle-radius': 3,
            'circle-color': '#007cbf'
          }}*/
        />
        </Source>
      </>
    )
  }

  render() {
      const {viewport, searchResultLayer} = this.state;
      const {  
          handleViewportChange,
          onClick,
          onDblClick,
          onSelected,
          onGeolocate
        } = this.props;
    return (
    <>
        <ReactMapGL
            ref={this.mapRef}
            mapboxApiAccessToken={mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={this.handleViewportChange}
        >
          
          <Directions 
            mapRef={this.mapRef} 
            mapboxApiAccessToken={mapboxApiKey} 
            position='top-left'
          />
          
        </ReactMapGL>
        {/*<DeckGL {...viewport} layers={[searchResultLayer]} />*/}
    </>
    );
  }
}
export default MapBox;
