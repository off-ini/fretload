import React, {useState} from 'react';
import {
    Card,
    Button,
    Badge,
    Collapse,
    Row
} from "reactstrap";
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";

 const MissionListItem = ({data, handleDelete}) => {
    const [d, setData] = useState({collapse: false, accordion: false, pls:true});

    const toggleAccordion = () => {
        setData({ accordion: !d.accordion, pls: !d.pls });
      };

  const getDate = (d) =>
  {
    const months = ["Janvier", "Fevier", "Mars","Avril", "Mai", "Jun", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    let current_datetime = new Date(d)
    return current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
  }
   
  return (
<>
<Colxx md="12" sm="12" lg="12" xxs="12" className="mb-4">
<Card className={`question d-flex mb-4 ${d.pls ? 'edit-quesiton': ''}`}> 
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="#" className=" w-sm-100">
            <p className="list-item-heading mb-1 truncate">
            {
              data.title
            }
          </p>
          </NavLink>
          
          {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
          <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
          <p className="mb-1 text-lg">
            {
            data.montant ?
            <>
                {
                    <NumberFormat value={parseInt(data.montant)} thousandSeparator={true} displayType={'text'} renderText={value => <>{value + ' '}</>} /> 
                }
                FCFA
            </>
            :null
            }
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
            <div className="mb-3">
            <p className="d-sm-inline-block mb-1 ml-5">
            <Can I="view" a="EDITMissions">
              <NavLink to={`/app/missions/edit/${data.id}`} >
                  <Button outline size="xs" color="info" ><i className="iconsminds-pen-2"></i></Button>
              </NavLink>
            </Can>
            <Can I="delete" a="Missions">
                <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
            </Can>
            </p>
            </div>
        
        </div>
      </div>
    <Collapse isOpen={d.accordion}>
      <Row className="m-5">
            {
                data.date_depart_pre ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Date départ
                    </p>
                    <p className="mb-3">{getDate(data.date_depart_pre)}</p>
                </Colxx>
                :
                null
            }
            {
                data.date_arriver_pre ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Date arrivée
                    </p>
                    <p className="mb-3">{getDate(data.date_arriver_pre)}</p>
                </Colxx>
                :null
            }
        </Row>
    </Collapse>
</Card>
  </Colxx>
</>
  );
}

export default React.memo(MissionListItem);
