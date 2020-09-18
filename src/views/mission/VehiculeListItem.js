import React, {useState} from 'react';
import {
    Card, CustomInput,FormGroup,Badge, Button, Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";

import ThumbnailImage from "../../components/cards/ThumbnailImage";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

import APIModel from '../../models/APIModel';

const VehiculeListItem = ({data, type, addVehicule, removeVehicule, add, remove, checked}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };
  
    
  return (
  <>
  {
    data ?
    <Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      <Badge
            color="primary"
            pill
            className="position-absolute badge-top-left"
        >
            {type ? type : null}
        </Badge>
      <div className="d-flex flex-grow-1 min-width-zero">
      {
          data.image ? 
            <ThumbnailImage src={`${APIModel.URL}images/${data.image}`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
          :
            <>
            {
                data.type ?
                <>
                {
                    data.type.default_image ?
                        <ThumbnailImage src={`${APIModel.URL}images/${data.type.default_image}`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
                    :
                    <ThumbnailLetters text={data.libelle} className="responsive border-0 card-img-left" />
                }
                </>
                :
                <ThumbnailLetters text={data.libelle} className="responsive border-0 card-img-left" />
            }
            </>
      }
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="/app/ui/cards" className=" w-sm-100">
            <p className="list-item-heading mb-1 truncate">
            {
              data.matricule
            }
          </p>
          </NavLink>
          
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-muted text-small w-sm-100">
            {
            data.type ?
            <Badge
                color="primary"
                pill
                className="mb-3"
            >
                {
                    data.type.libelle
                }
            </Badge>
            :null
            }
          </p>
          <p className="mb-1 text-muted text-small w-sm-100">
                {data.taille || data.capacite ? 
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
            {
              add ?
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <FormGroup className="mb-0">
                        <CustomInput
                        type="checkbox"
                        id="check1"
                        label=""
                        checked={checked}
                        onClick={() => {addVehicule(data.id)}}
                        />
                    </FormGroup>
                </div>
              :null
            }
            {
              remove ?
                <div className="mb-3">
                    <p className="d-sm-inline-block mb-1 ml-5">
                        <Button outline size="xs" color="danger" onClick={() => {removeVehicule(data.id)}} ><i className="simple-icon-trash"></i></Button>
                    </p>
                </div>
              :null
            }
        
        </div>
      </div>
    <Collapse isOpen={d.accordion}>
            {
            data.capacite ?
                <p className="mb-1 text-muted"> Capacité: { data.capacite }</p>
            :null
            }
            {
            data.taille ?
                <p className="mb-1 text-muted">Taille: { data.taille }</p>
            :null
            }
    </Collapse>
</Card>
 :null
  }
  </>
       
  );
}

export default React.memo(VehiculeListItem);
