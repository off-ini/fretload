import React, {useState} from 'react';
import {
    Card, Button, Collapse, Badge, Row
} from "reactstrap";
import { NavLink } from "react-router-dom";
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";

import MarchandiseListItem from '../mission/MarchandiseListItem';
import UserListItem from '../mission/UserListItem';

import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

const AnnonceListItem = ({data, toggleEditModal, user, annonce_news = [], show, hideProposition}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
<Colxx md="12" sm="12" lg="12" xxs="12" className="mb-4">
  {
    data.marchandise ?
    <Card className={`question d-flex ${d.pls ? 'edit-quesiton': ''}`}> 
    <Can I="user" a="Transporteur">
          {
            annonce_news ? 
            <>
              {
                annonce_news.find(e => e.id === data.id) ?
                  <Badge
                    color="danger"
                    pill
                    className="position-absolute badge-top-left"
                  >
                      New
                  </Badge>
                :null
              }
            </>
            :null
          }
          </Can>
    <div className="d-flex flex-grow-1 min-width-zero">
      {
        data.marchandise.image ? 
        <ThumbnailImage src={`${APIModel.URL}images/defaults/${data.marchandise.image}`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
        :
        <ThumbnailImage src={`${APIModel.URL}images/defaults/annonce.png`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
      }

      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <NavLink to="#" className="w-40 w-sm-100">
          <p className="list-item-heading mb-1 truncate">
            {data.marchandise.libelle}
          </p>
        </NavLink>
        
        <p className="list-item-heading mb-1 truncate">
          <NumberFormat value={parseFloat(data.montant)} mask=" " thousandSeparator={true} displayType={'text'} renderText={value => <>{value + ' '}</>} /> FCFA
        </p>
      </div>
    
      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        
        {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
        <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
        {
          data.marchandise ?
          <p className="mb-1 text-muted">Type: {`${data.marchandise.type.libelle}`}</p>
          :null
        }

        {
          data.marchandise.adresse_depart ?
            <p className="list-item-heading mb-1 truncate">
              Départ: {data.marchandise.adresse_depart.pays.label + ", " + data.marchandise.adresse_depart.ville.label}
            </p>
          :null
        }

        {
          data.marchandise.adresse_arriver?
            <p className="list-item-heading mb-1 truncate">
              Arrivée: {data.marchandise.adresse_arriver.pays.label + ", " + data.marchandise.adresse_arriver.ville.label}
            </p>
          :null
        }
        <p className="mb-1 text-muted text-small w-15 w-sm-100">{moment(data.created_at).fromNow()}</p>
      </div>
      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <p className="mb-1 text-muted text-small w-15 w-sm-100"> 
            <Button
              color="link"
              onClick={() => toggleAccordion()}
              aria-expanded={d.accordion}
            >
                {
                    d.pls ? 'Plus' : 'Moins'
                }
            </Button>
          </p>
          <div className="mb-0">
            {
              data.owner_id === user.id ?
              <>
              {
                show ? 
                <>
                  <Can I="edit" a="Annonces">
                    <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
                  </Can>
                  {/*
                  <Can I="delete" a="Annonces">
                    <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
                  </Can>*/}
                </>
                :null
              }
              </>
              :
              <>
              {
                !hideProposition ? 
                <NavLink to={`/app/propositions/add/${data.id}`} >
                  <Button outline size="xs" color="primary" ><i className="iconsminds-pen-2"></i></Button>
                </NavLink>
                :null
              }
              
              </>
            }
        </div>
      </div>
    </div>
    <Collapse isOpen={d.accordion}>
        <Row className="m-5">
            <Colxx md="4" sm="6" lg="4" xxs="12" >
                <MarchandiseListItem
                  data={data.marchandise}
                />
            </Colxx>
            <Colxx md="4" sm="6" lg="4" xxs="12" >
                
            </Colxx>
            <Colxx md="4" sm="6" lg="4" xxs="12" >
                <UserListItem
                  data={data.owner}
                  type="propriétaire"
                />
            </Colxx>

            {
                data.body ?
                <Colxx md="12" sm="12" lg="12" xxs="12" >
                    <p className="text-muted text-small mb-2">
                      Description
                    </p>
                    <p className="mb-3">{data.body}</p>
                </Colxx>
                :
                null
            }
        </Row>
    </Collapse>
  </Card>

    :null
  }
</Colxx>
  );
}

export default React.memo(AnnonceListItem);
