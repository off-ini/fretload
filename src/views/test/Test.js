import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/UserAction';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import DataTablePagination from "../../components/DatatablePagination";

import Can from '../../config/Can';
import {errorHandler} from '../../utils/auth';

const dataTableColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Username",
    accessor: "username",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
];

/*const ReactTableWithPaginationCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="table.react-pagination" />
        </CardTitle>
        <ReactTable
          data={data}
          columns={dataTableColumns}
          defaultPageSize={5}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
};*/


class Test extends Component {
  componentDidMount()
  {
    this.allUsers();
  }

  allUsers()
  {
    let { allUsers, dispatch, history } = this.props
    allUsers().then(res => {
      dispatch({type:actions.ALL_USERS, payload:res.data.data});
    }).catch(e => errorHandler(e, dispatch, history))
  }

  render() {
    return (
      <>
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Test" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <h1>Users</h1>
            <Can I="view" a="Proposal" >
              <h1>Test 1</h1>
            </Can>
          </Colxx>
          <Colxx xxs="12" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Liste des Utilisateurs
                </CardTitle>
                <ReactTable
                  data={this.props.users}
                  columns={dataTableColumns}
                  defaultPageSize={5}
                  showPageJump={false}
                  showPageSizeOptions={false}
                  PaginationComponent={DataTablePagination}
                  className={"react-table-fixed-height"}
                />
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Liste des Utilisateurs
                </CardTitle>
                <ReactTable
                  data={this.props.users}
                  columns={dataTableColumns}
                  defaultPageSize={5}
                  filterable={true}
                  showPageJump={true}
                  PaginationComponent={DataTablePagination}
                  showPageSizeOptions={true}
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.UsersReducer.users
  }
}

const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
    allUsers: () => actionsCreator.allUsers()
  }
}

export default connect(mapStateToProps, mapDispatchToProsps)(Test);
