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
    {id:0, color: 'dark', name:'Libre'},
    {id:1, color: 'info', name:'Annoncer'},
    {id:2, color: 'danger', name:'En Cours'},
    {id:3, color: 'success', name:'Livrer'},
  ];

 const MarchandiseListItem = ({data, toggleEditModal, handleDelete, toggleAnnonceModal}) => {
  return (
<>
    {/*<Colxx md="6" sm="6" lg="6" xxs="12">
        <Card className="d-flex flex-row mb-4">
            <NavLink to={`/app/adresses/${data.id}`} className="d-flex">
                <ThumbnailLetters rounded text={data.libelle} className="m-4" />
                <ThumbnailImage rounded small src="/assets/img/profile-pic-l.jpg" alt="profile" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                    <NavLink to={`/app/adresses/${data.id}`}>
                    <CardSubtitle className="truncate mb-1">{data.libelle}</CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2"></CardText>
                    <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
                    <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
                </div>
                </CardBody>
            </div>
        </Card>
    </Colxx>*/}
<Colxx md="6" sm="4" lg="4" xxs="12" className="mb-4">
    <Card className="mb-4">
      <div className="position-absolute card-top-buttons">
        {
          data.status < 1 ?
          <Button outline color="primary" className="icon-button" onClick={() => toggleAnnonceModal(data.id)}>
            <i className="simple-icon-bell" />
          </Button>
          :null
        }
        
      </div>
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
              data.libelle
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
                data.qte ?
                <Colxx md="4" sm="4" lg="4" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Quantité
                    </p>
                    <p className="mb-3">{data.qte}</p>
                </Colxx>
                :
                null
            }
            {
                data.poid ?
                <Colxx md="4" sm="4" lg="4" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Poid (Tone)
                    </p>
                    <p className="mb-3">{data.poid}</p>
                </Colxx>
                :null
            }
            {
                data.volume ?
                <Colxx md="4" sm="4" lg="4" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Volume (m<sup>3</sup>)
                    </p>
                    <p className="mb-3">{data.volume}</p>
                </Colxx>
                :null
            }
        </Row>
        
        <div className="mb-3">
        {
          data.status < 1 ?
          <p className="d-sm-inline-block mb-1 ml-5">
          <Can I="edit" a="Marchandises">
            <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
          </Can>
          <Can I="delete" a="Marchandises">
            <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
          </Can>
          </p>
          :null
        }  
        </div>
      </CardBody>
    </Card>
  </Colxx>
</>
  );
}

export default React.memo(MarchandiseListItem);
