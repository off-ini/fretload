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

import MarchandiseListItem from './MarchandiseListItem';
import UserListItem from './UserListItem';
import DestinataireListItem from './DestinataireListItem';
import VehiculeListItem from './VehiculeListItem';
import ChauffeurListItem from './ChauffeurListItem';
import AdresseListItem from './AdresseListItem';
import MissionWizard from './MissionWizard';
import { da } from 'date-fns/esm/locale';

const status = [
  {id:0, color: 'dark', name:'Chargement'},
  {id:1, color: 'danger', name:'En Cours'},
  {id:2, color: 'info', name:'Livrer'},
  {id:3, color: 'success', name:'Payer'},
];

 const MissionListItem = ({data, handleDelete, togglePayementModal}) => {
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
        <Badge
            color={status[data.status].color}
            pill
            className="position-absolute badge-top-left"
        >
            {
              status[data.status].name
            }
        </Badge>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to="#" className="">
            <p className="list-item-heading mb-1">
            {
              data.title
            }
          </p>
          </NavLink>
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
        </div>
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <Row className="m-0" style={{width:'100%', textAlign:'center'}}>
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
        </div>
        <div className=" align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          
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
            <p className="d-sm-inline-block m-2">
              {
                data.status >= 2 ?
                  <NavLink to={`/app/missions/rapport/${data.id}`} >
                    <Button outline size="xs" color="primary" ><i className="iconsminds-file-clipboard"></i></Button>
                  </NavLink>
                :null
              }
              {
                data.status >= 1 && data.status < 2 ? 
                  <NavLink to={`/app/missions/stream/${data.id}`} >
                    <Button outline size="xs" color="danger" ><i className="iconsminds-map2"></i></Button>
                  </NavLink>
                :null
              }
              {
                data.status < 1 ?
                <>
                <Can I="view" a="EDITMissions">
                  <NavLink to={`/app/missions/edit/${data.id}`} >
                      <Button outline size="xs" color="info" ><i className="iconsminds-pen-2"></i></Button>
                  </NavLink>
                </Can>
                <Can I="delete" a="Missions">
                    <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
                </Can>
                </>
                :null
              }
            </p>
            </div>
        
        </div>
      </div>
    <Collapse isOpen={d.accordion}>
    <Row className="m-1 mb-2">
      <Colxx md="12" sm="12" lg="12" xxs="12" >
        <MissionWizard id={data.id} togglePayementModal={togglePayementModal} />
      </Colxx>
    </Row>

    <Row className="m-1">
        <Colxx md="6" sm="6" lg="6" xxs="12" >
          {
              data.chauffeurs ?
              <>
                {
                    data.chauffeurs.length > 0 ?
                    <>  
                        {
                            data.chauffeurs.map((r,i) => {
                            return (
                                <ChauffeurListItem
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
        <Colxx md="6" sm="12" lg="6" xxs="12" >
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
    </Row>

    <Row className="m-1">
        <Colxx md="6" sm="6" lg="6" xxs="12" >
          {
              data.proposition ?
              <>
                <AdresseListItem
                  data={data.proposition.annonce.marchandise.adresse_depart}
                  type="Adresse Départ"
                />
              </>
              :null
          }
        </Colxx>
        <Colxx md="6" sm="12" lg="6" xxs="12" >
          {
            data.proposition ?
            <>
              <AdresseListItem
                data={data.proposition.annonce.marchandise.adresse_arriver}
                type="Adresse Arrivée"
              />
              </>
            :null
        }  
      </Colxx>
    </Row>
    
    <Row className="m-1">
            <Colxx md="4" sm="6" lg="4" xxs="12" >
              {
                data.marchandise ?
                  <MarchandiseListItem
                    data={data.marchandise}
                  />
                :null
              }
            </Colxx>
            <Colxx md="4" sm="6" lg="4" xxs="12" >
              {
                data.proposition ?
                  <>
                  {
                    data.proposition.annonce ?
                    <>
                    {
                      data.proposition.annonce.owner ?
                      <UserListItem
                        data={data.proposition.annonce.owner}
                        type="propriétaire"
                      />
                      :null
                    }
                    </>
                    :null
                  }
                  </>
                :null
              }
                
            </Colxx>
            <Colxx md="4" sm="6" lg="4" xxs="12" >
              {
                data.destinataire ?
                  <DestinataireListItem
                    data={data.destinataire}
                    type="Destinataire"
                  />
                :null
              }
            </Colxx>
        </Row>
    </Collapse>
</Card>
  </Colxx>
</>
  );
}

export default React.memo(MissionListItem);
