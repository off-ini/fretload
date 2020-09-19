import React, {useState} from 'react';
import {
    Card, Badge, Button, Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import APIModel from '../../models/APIModel';

import ThumbnailImage from "../../components/cards/ThumbnailImage";

 const AdresseListItem = ({data, type}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
    
  return (
<Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      <Badge
            color="primary"
            pill
            className="position-absolute badge-top-left"
        >
            {type ? type : null}
        </Badge>
      <div className="d-flex flex-grow-1 min-width-zero">
        <NavLink to="#" className="d-flex">
            <ThumbnailImage src={`${APIModel.URL}images/defaults/adresse.png`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
        </NavLink>
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="#" className=" w-sm-100">
            <p className="list-item-heading mb-1 truncate">{data.name}</p>
          </NavLink>
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-muted text-small w-sm-100">{`${data.pays.label}, ${data.ville.label}`}</p>
          <p className="mb-1 text-muted text-small w-sm-100">
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
        
  );
}

export default React.memo(AdresseListItem);
