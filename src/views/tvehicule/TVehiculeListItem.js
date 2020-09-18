import React from 'react';
import {
    Card,
    Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import APIModel from '../../models/APIModel';
import Can from '../../config/Can';

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

 const TVehiculeListItem = ({data, toggleEditModal, handleDelete}) => {
  return (
<Colxx xxs="12">
<Card className="d-flex flex-row mb-3">
  <NavLink to="/app/ui/cards" className="d-flex">
  {
      data.default_image ?
      <ThumbnailImage src={`${APIModel.URL}images/${data.default_image}`} alt="..." className="list-thumbnail responsive border-0 card-img-left" />
      :
      <ThumbnailLetters text={data.libelle} className="responsive border-0 card-img-left" />
    }
  </NavLink>
  <div className="pl-2 d-flex flex-grow-1 min-width-zero">
    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
      <NavLink to="/app/ui/cards" className="w-40 w-sm-100">
        <p className="list-item-heading mb-1 truncate">{data.libelle}</p>
      </NavLink>
      {/*<p className="mb-1 text-muted text-small w-15 w-sm-100">Cakes</p>
      <p className="mb-1 text-muted text-small w-15 w-sm-100">09.04.2018</p>*/}
      <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
      <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
      <div className="custom-control pl-1 align-self-center">
      <Can I="edit" a="TypeVehicules">
        <Button outline size="xs" color="info" onClick={() => toggleEditModal(data.id)}><i className="iconsminds-pen-2"></i></Button>
      </Can>
      <Can I="delete" a="TypeVehicules">
        <Button outline size="xs" color="danger" onClick={() => handleDelete(data.id)}><i className="simple-icon-trash"></i></Button>
      </Can>
      </div>
      {/*<div className="w-15 w-sm-100">
        <Badge color="primary" pill >PROCESSED</Badge>
        </div>*/}
    </div>
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
</Colxx>
  );
}

export default React.memo(TVehiculeListItem);
