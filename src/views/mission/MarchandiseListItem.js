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

 const MarchandiseListItem = ({data}) => {
  return (
<>
<Card className="mb-4">
      <div className="position-absolute card-top-buttons">
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
                        Poid
                    </p>
                    <p className="mb-3">{data.poid}</p>
                </Colxx>
                :null
            }
            {
                data.volume ?
                <Colxx md="4" sm="4" lg="4" xxs="12" >
                    <p className="text-muted text-small mb-2">
                        Volume
                    </p>
                    <p className="mb-3">{data.volume}</p>
                </Colxx>
                :null
            }
        </Row>
      </CardBody>
</Card>

</>
  );
}

export default React.memo(MarchandiseListItem);
