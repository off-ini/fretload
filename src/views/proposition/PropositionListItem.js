import React, {useState} from 'react';
import {
    Card, Button, Collapse, Row
} from "reactstrap";
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

 const PropositionListItem = ({data, toggleEditModal, handleDelete, checked, handleAccept}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
    <Colxx xxs="12">
    <Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      {/*<NavLink to="/app/ui/cards" className="d-flex">
          <ThumbnailImage src="/assets/img/chocolate-cake-thumb.jpg" alt="..." className="list-thumbnail responsive border-0 card-img-left" />
        </NavLink>*/}
      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="/app/ui/cards" className="w-40 w-sm-100">
            <p className="list-item-heading mb-1 truncate">
            <NumberFormat value={parseInt(data.montant_t)} thousandSeparator={true} displayType={'text'} renderText={value => <>{value + ' '}</>} /> FCFA
            </p>
          </NavLink>
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {data.description || data.adresse ? 
                    <Button
                      color="link"
                      onClick={() => toggleAccordion()}
                      aria-expanded={d.accordion}
                    >
                        {
                            d.pls ? 'Plus' : 'Moins'
                        }
                    </Button>
                     :'' 
                }
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
              <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
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
    </Colxx>
  );
}

export default React.memo(PropositionListItem);
