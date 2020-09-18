import React, {useState} from 'react';
import {
    Card, Button, Collapse, Row
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";

import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

const AdresseListItem = ({data, toggleEditModal, handleDelete}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
   
  return (
    <Colxx xxs="12">
    <Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      <div className="d-flex flex-grow-1 min-width-zero">
      <ThumbnailImage src={`${APIModel.URL}images/defaults/adresse.png`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="#" className="w-40 w-sm-100">
            <p className="list-item-heading mb-1 truncate">{data.name}</p>
          </NavLink>
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-muted text-small w-15 w-sm-100">{`${data.pays.label}, ${data.ville.label}`}</p>
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
          <Can I="edit" a="Adresses">
            <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
          </Can>
          <Can I="delete" a="Adresses">
            <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
          </Can>
          </div>
          
        </div>  
      </div>
    </Card>
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
    </Colxx>
  );
}

export default React.memo(AdresseListItem);
