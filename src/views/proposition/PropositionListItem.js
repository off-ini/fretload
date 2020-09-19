import React, {useState} from 'react';
import {
    Card, Button, Collapse, Row
} from "reactstrap";
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import moment from 'moment';

import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import VehiculeListItem from '../mission/VehiculeListItem';

 const PropositionListItem = ({data, toggleEditModal, handleDelete, checked, handleAccept}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
    <Colxx xxs="12">
      {
        data.annonce ?
        <Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
        {/*<NavLink to="/app/ui/cards" className="d-flex">
            <ThumbnailImage src="/assets/img/chocolate-cake-thumb.jpg" alt="..." className="list-thumbnail responsive border-0 card-img-left" />
          </NavLink>*/}
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to="#" className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {data.annonce.marchandise.libelle}
              </p>
            </NavLink>
            <NavLink to="#" className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
              <NumberFormat value={parseFloat(data.montant_t)} thousandSeparator={true} displayType={'text'} renderText={value => <>{value + ' '}</>} /> FCFA
              </p>
            </NavLink>
          </div>
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            {
              data.annonce.marchandise.adresse_depart ?
                <p className="list-item-heading mb-1 truncate">
                  Départ: {data.annonce.marchandise.adresse_depart.pays.label + ", " + data.annonce.marchandise.adresse_depart.ville.label}
                </p>
              :null
            }

            {
              data.annonce.marchandise.adresse_arriver?
                <p className="list-item-heading mb-1 truncate">
                  Arrivée: {data.annonce.marchandise.adresse_arriver.pays.label + ", " + data.annonce.marchandise.adresse_arriver.ville.label}
                </p>
              :null
            }
            {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
            <p className="mb-1 text-muted text-small w-15 w-sm-100">{moment(data.created_at).fromNow()}</p>
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
              <Can I="user" a="Proprietaire">
                <Switch
                    className="custom-switch custom-switch-primary"
                    checked={checked}
                    onChange={switchCheckedPrimary => {
                      handleAccept(data.id);
                    }}
                />
              </Can>
              <Can I="view" a="ADDMissions">
                {
                  data.is_accept ?
                    <NavLink to={`/app/missions/add/${data.id}`} outline size="xs" color="default" >
                      <Button outline size="xs" color="default" >
                        Mission
                      </Button>
                    </NavLink>
                  :null
                }
                
              </Can>
              <Can I="edit" a="Propositions">
                <NavLink to={`/app/propositions/edit/${data.annonce ? data.annonce.id : '#' }`} >
                  <Button outline size="xs" color="info" ><i className="iconsminds-pen-2"></i></Button>
                </NavLink>
              </Can>
              <Can I="delete" a="Propositions">
                <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
              </Can>
            </div>
            {/*<div className="w-15 w-sm-100">
              <Badge color="primary" pill >PROCESSED</Badge>
              </div>*/}
          </div>
        </div>
        <Collapse isOpen={d.accordion}>
          <Row className="m-5">
          <Colxx md="12" sm="12" lg="12" xxs="12" >
          {
              data.vehicules ?
              <>
                {
                    data.vehicules.length > 0 ?
                    <>  
                        {
                            data.vehicules.map((r,i) => {
                            return (
                                <VehiculeListItem
                                    key={i} 
                                    data={r} 
                                    remove={false}
                                />
                            )
                            })
                        }    
                    </>
                    :null
                }  
                </>
              :null
              }
            </Colxx>
              {
                  data.adresse ?
                  <Colxx md="12" sm="12" lg="12" xxs="12" >
                      <p className="text-muted text-small mb-2">
                          Adresse
                      </p>
                      <p className="mb-3">{data.adresse}</p>
                  </Colxx>
                  :
                  null
              }
              {
                  data.description ?
                  <Colxx md="12" sm="12" lg="12" xxs="12" >
                      <p className="text-muted text-small mb-2">
                          Description
                      </p>
                      <p className="mb-3">{data.description}</p>
                  </Colxx>
                  :null
              }
          </Row>
        </Collapse>
      </Card>
      
        :null
      }
   
    </Colxx>
  );
}

export default React.memo(PropositionListItem);
