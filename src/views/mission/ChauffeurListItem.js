import React, {useState} from 'react';
import {
    Card, CustomInput,FormGroup, Button, Collapse, CardText,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import ThumbnailImage from "../../components/cards/ThumbnailImage";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

import APIModel from '../../models/APIModel';

const ChauffeurListItem = ({data, type, addChauffeur, removeChauffeur, add, remove, checked}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
  <>
  {
    data ?
    <Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      <div className="d-flex flex-grow-1 min-width-zero">
        {
            data.photo ?
            <ThumbnailImage rounded src={`${APIModel.URL}images/${data.photo}`} alt="..." className="list-thumbnail  card-img-left" />
            :
            <ThumbnailLetters rounded text={`${data.name} ${data.f_name}`}  />
        }
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="/app/ui/cards" className=" w-sm-100">
            <p className="list-item-heading mb-1 truncate">
            {
              `${data.name} ${data.f_name}`
            }
          </p>
          </NavLink>
          
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-muted text-small w-sm-100">
          <CardText className="text-muted text-small mb-2">{`${data.pays.label}, ${data.ville.label}`}</CardText>
          </p>
          <p className="mb-1 text-muted text-small w-sm-100">
            
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
            {
              add ?
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <FormGroup className="mb-0">
                        <CustomInput
                        type="checkbox"
                        id="check1"
                        label=""
                        checked={checked}
                        onClick={() => {addChauffeur(data.id)}}
                        />
                    </FormGroup>
                </div>
              :null
            }
            {
              remove ?
                <div className="mb-3">
                    <p className="d-sm-inline-block mb-1 ml-5">
                        <Button outline size="xs" color="danger" onClick={() => {removeChauffeur(data.id)}} ><i className="simple-icon-trash"></i></Button>
                    </p>
                </div>
              :null
            }
        
        </div>
      </div>
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
 :null
  }
  </>
       
  );
}

export default React.memo(ChauffeurListItem);
