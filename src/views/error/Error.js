import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle,Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Colxx } from "../../components/common/CustomBootstrap";

class Error extends Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">LA MAGIE EST DANS LES DÉTAILS</p>
                  </div>
                  <div className="form-side">
                    <Link to={'/'} className="white">
                      <span className="logo-single" />
                    </Link>
                    <CardTitle className="mb-4">
                    Oups ... on dirait qu'une erreur s'est produite!
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      Error 404
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      Retour
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
export default Error;
