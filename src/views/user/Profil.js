import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as annonceCreator from '../../store/actions/UserAction';

import { Row, Card, CardBody, Badge } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

import APIModel from '../../models/APIModel';

class Profil extends Component {

render() {
    const { user } = this.props;
    return (
<>
<Fragment>
    <Row>
    <Colxx xxs="12">
        <h1>
            Profil
        </h1>
        <Breadcrumb match={this.props.match} />
        <Separator className="mb-5" />
    </Colxx>
    </Row>
    <Row>
        <Colxx xxs="6" lg="4" md="4" className="mb-4 icon-cards-row" >
<Card className="mb-4">
      <div className="position-absolute card-top-buttons">
      </div>
      {
          user.photo ? 
            <img
            src={`${APIModel.URL}images/${user.photo}`}
            alt="Detail"
            className="card-img-top"
            />
          :
          <img
            src={`/assets/img/user.png`}
            alt="Detail"
            className="card-img-top"
          />
      }
      
        <Badge
            color="primary"
            pill
            className="position-absolute badge-top-left"
        >
            {
                user.auth.roles ?
                    user.auth.roles[0]
                :null
            }
        </Badge>
      <CardBody className="m-2">
        <h2 className="text-muted mb-2">
          {
              `${user.name} ${user.f_name}`
          }
        </h2>
        {
            user.sexe ?
            <Badge
                color="info"
                pill
                className="mb-3 mr-3"
            >
                {
                    user.sexe == 'H' ? 'Homme' : 'Femme'
                }
            </Badge>
            :null
        }
            <Badge
                color="danger"
                pill
                className="mb-3"
            >
                code : 
                {
                    ' ' + user.code
                }
            </Badge>
        {
            user.adresse ?
            <>
                <p className="text-muted text-small mb-2">
                    Adresse
                </p>
                <p className="mb-3">
                {user.adresse}
                </p>
            </>
            :null
        }
        <Row>
            {
                user.email ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Email
                    </p>
                    <p className="mb-3"><a href={`mailTo:${user.email}`}>{user.email}</a></p>
                </Colxx>
                :
                null
            }
            {
                user.phone ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Phone
                    </p>
                    <p className="mb-3">{user.phone}</p>
                </Colxx>
                :null
            }
        </Row>
      </CardBody>
</Card>
        </Colxx>
        <Colxx xxs="6" lg="8" md="8" className="mb-4 icon-cards-row">
            
        </Colxx>
    </Row>
</Fragment>
</>
    )
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
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(Profil);
