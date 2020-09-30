import React from 'react';
import {
    Row,
    Card,
    CardBody,
    Badge
} from "reactstrap";
import APIModel from '../../models/APIModel';

import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailLetters from "../../components/cards/ThumbnailLetters";

 const UserListItem = ({data}) => {
  return (
<>
<Card className="mb-4">
      <div className="position-absolute card-top-buttons">
      </div>
      {
          data.photo ? 
            <img
            src={`${APIModel.URL}images/${data.photo}`}
            alt="Detail"
            className="card-img-top"
            />
          :
          <img
            src={`/assets/img/user.png`}
            alt="Detail"
            className="card-img-top"
          />
      }
      
        <Badge
            color="primary"
            pill
            className="position-absolute badge-top-left"
        >
            Propriétaire
        </Badge>
      <CardBody>
        <h2 className="text-muted mb-2">
          {
              `${data.name} ${data.f_name}`
          }
        </h2>
        {
            data.sexe ?
            <Badge
                color="info"
                pill
                className="mb-3"
            >
                {
                    data.sexe
                }
            </Badge>
            :null
        }
        {
            data.adresse ?
            <>
                <p className="text-muted text-small mb-2">
                    Adresse
                </p>
                <p className="mb-3">
                {data.adresse}
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
                data.email ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Email
                    </p>
                    <p className="mb-3"><a href={`mailTo:${data.email}`}>{data.email}</a></p>
                </Colxx>
                :
                null
            }
            {
                data.phone ?
                <Colxx md="6" sm="6" lg="6" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Phone
                    </p>
                    <p className="mb-3">{data.phone}</p>
                </Colxx>
                :null
            }
        </Row>
      </CardBody>
</Card>

</>
  );
}

export default React.memo(UserListItem);
