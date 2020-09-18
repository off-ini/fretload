import React, {useState} from 'react';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    Button,
    Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

 const ReciverListItem = ({data, toggleEditModal, handleDelete}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
<Colxx md="6" sm="6" lg="6" xxs="12">
    <Card className={`d-flex flex-row ${d.pls ? ' mb-4': ''}`}> 
        <NavLink to={`/app/recivers/${data.id}`} className="d-flex">
            {/*<ThumbnailLetters rounded text={`${data.name} ${data.f_name}`} className="m-4" />*/}
            {
              data.photo ?
              <ThumbnailImage rounded src={`${APIModel.URL}images/${data.photo}`} alt="..." className="list-thumbnail m-4 card-img-left" />
              :
              <ThumbnailLetters rounded text={`${data.name} ${data.f_name}`} className="m-4" />
            }
        </NavLink>
      <div className="d-flex flex-grow-1">
        <CardBody className="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <div className="">
                <NavLink to={`/app/reciver/${data.id}`}>
                <CardSubtitle className="truncate mb-1">{`${data.name} ${data.f_name}`}</CardSubtitle>
                </NavLink>
                <CardText className="text-muted text-small mb-2">{`${data.pays.label}, ${data.ville.label}`}</CardText>
                
                <Button
                    color="link"
                    onClick={() => toggleAccordion()}
                    aria-expanded={d.accordion}
                >
                    {
                        d.pls ? 'Plus' : 'Moins'
                    }
                </Button>
                <Can I="edit" a="Recivers">  
                  <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
                </Can>
                <Can I="delete" a="Recivers">  
                  <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
                </Can>
            </div>
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          {/*<div className="w-15 w-sm-100">
            <Badge color="primary" pill >PROCESSED</Badge>
            </div>*/}
        </CardBody>
        {/*<div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
        <FormGroup className="mb-0">
            <CustomInput
              type="checkbox"
              id="check1"
              label=""
            />
          </FormGroup>
        </div>*/}
        </div>
    </Card>
    <Card className="mb-3">
        <Collapse isOpen={d.accordion}>
              {
                data.adresse ?
                 <p className="mb-1 text-muted"> Adresse: { data.adresse }</p>
                :null
              }
              {
                data.description ?
                  <p className="mb-1 text-muted">Description: { data.description }</p>
                :null
              }
        </Collapse>
    </Card>
</Colxx>
  );
}

export default React.memo(ReciverListItem);
