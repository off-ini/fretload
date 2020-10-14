import React from 'react';
import {
    Row,
    Card,
    CardBody,
    Button,
    Badge
} from "reactstrap";
import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

const status = [
  {id:0, color: 'success', name:'Libre'},
  {id:1, color: 'warning', name:'En Cours'},
];

 const VehiculeListItem = ({data, toggleEditModal, handleDelete}) => {
  return (
<>

<Colxx md="4" sm="4" lg="4" xxs="12" className="mb-4">
    <Card className="mb-4">
      {/*<div className="position-absolute card-top-buttons">
        <Button outline color={"white"} className="icon-button">
          <i className="simple-icon-bell" />
        </Button>
        </div>*/}
      {
          data.image ? 
            <img
            src={`${APIModel.URL}images/${data.image}`}
            alt="Detail"
            className="card-img-top"
            />
          :
            <>
            {
                data.type ?
                <>
                {
                    data.type.default_image ?
                        <img
                        src={`${APIModel.URL}images/${data.type.default_image}`}
                        alt="Detail"
                        className="card-img-top"
                        />
                    :
                    <ThumbnailLetters text={data.libelle} className="responsive border-0 card-img-left" />
                }
                </>
                :
                <ThumbnailLetters text={data.libelle} className="responsive border-0 card-img-left" />
            }
            </>
      }
        <Badge
            color={status[data.status].color}
            pill
            className="position-absolute badge-top-left"
        >
            {
              status[data.status].name
            }
        </Badge>
      <CardBody>
        <h2 className="text-muted mb-2">
          {
              data.matricule
          }
        </h2>
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
        
      {
            data.description ?
            <>
                <p className="text-muted text-small mb-2">
                    Description
                </p>
                <p className="mb-3">
                {data.description}
                </p>
            </>
            :null
        }

        {/*<p className="text-muted text-small mb-2">
          <IntlMessages id="pages.rating" />
        </p>
        <div className="mb-3">
          <Rating total={5} rating={5} interactive={false} />
        </div>*/}

        <Row>
            {
                data.capacite ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Capacite
                    </p>
                    <p className="mb-3">{data.capacite}</p>
                </Colxx>
                :
                null
            }
            {
                data.taille ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Taille (m)
                    </p>
                    <p className="mb-3">{data.taille}</p>
                </Colxx>
                :null
            }
        </Row>
       
        <div className="mb-3">
            <p className="d-sm-inline-block mb-1 ml-5">
              <Can I="edit" a="Vehicules">
                <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
              </Can>
              <Can I="delete" a="Vehicules">  
                <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
              </Can>
            </p>
        </div>
      </CardBody>
    </Card>
  </Colxx>
</>

  );
}

export default React.memo(VehiculeListItem);
