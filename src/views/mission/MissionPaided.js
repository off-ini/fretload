import React, { Component, Fragment } from 'react'
import * as actions from '../../store/actions/type';
import {
  Row,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

{/*import TMarchandiseMenu from './TMarchandiseMenu';*/}

class TMarchandise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount()
    {

    }

  render() {
    return (
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Paiements
                </h1>
                <Breadcrumb match={this.props.match} />
            </div>
            <Separator className="mb-5" />
            
                <Row style={{'textAlign':'center'}}>   
                    <h1 style={{'textAlign':'center'}}>Paiement éffectuer avec sucess</h1>
                    <h3 style={{'textAlign':'center'}}><NavLink to="/app/missions">Retour</NavLink></h3>
                </Row>
                          
          </Colxx>
        </Row>
        
    </Fragment>
    )
  }
}



export default TMarchandise;
