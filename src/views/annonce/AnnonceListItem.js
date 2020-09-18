import React, {useState} from 'react';
import {
    Card, Button, Collapse, Badge, Row
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";

import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

const AnnonceListItem = ({data, toggleEditModal, togglePropositionModal, handleDelete, user, annonce_news, show}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
<Colxx md="12" sm="12" lg="12" xxs="12" className="mb-4">
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
      <ThumbnailImage src={`${APIModel.URL}images/defaults/annonce.png`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="#" className="w-40 w-sm-100">
            <p className="list-item-heading mb-1 truncate">{data.title}</p>
          </NavLink>
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          {
            data.marchandise ?
            <p className="mb-1 text-muted text-small">{`${data.marchandise.libelle}, ${data.marchandise.type.libelle}`}</p>
            :null
          }
          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {data.body ? 
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
                  <Button outline size="xs" color="primary" onClick={() => togglePropositionModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
                </>
              }
          </div>
        </div>
      </div>
      <Collapse isOpen={d.accordion}>
          <Row className="m-5">
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
</Colxx>
  );
}

export default React.memo(AnnonceListItem);
