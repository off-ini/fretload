import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/VehiculeActions';
import Can from '../../config/Can';
import { injectIntl } from "react-intl";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Collapse,
} from "reactstrap";
import Pagination from "react-js-pagination";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";

import * as msg from '../../utils/messages';

import AddVehicule from './AddVehicule';
import EditVehicule from './EditVehicule';
import VehiculeListItem from './VehiculeListItem';
import VehiculeMenu from './VehiculeMenu';

class Vehicule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            addModalOpen: false,
            editModalOpen: false,
            lastChecked: null,
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            id:null,

            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            loading:false,
        };
    }

    componentDidMount()
    {
        this.all();
    }

    all()
    {
      this.setState({loading:true});
        let { all, dispatch, history } = this.props
        all().then(res => {
        dispatch({type:actions.ALL_VEHICULES, payload:res.data.data});
        this.setState({
          activePage: res.data.meta.current_page,
          itemsCountPerPage: res.data.meta.per_page,
          totalItemsCount: res.data.meta.total
        })
        }).catch(e => msg.errorHandler(e, dispatch, history))
        .finally(() => this.setState({loading:false}));
    }

    handleDelete = (id) => {
      let { deleted, dispatch, history } = this.props
      deleted(id).then(res => {
        dispatch({type:actions.DELETE_VEHICULE, payload:res.data.id});
        msg.successHandler(msg.SUCCESS_TITLE, msg.DELETE_SUCCESS);
      }).catch(e => msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.DELETE_ERROR))
    }

    toggleAddModal = () => {
        this.setState({
          addModalOpen: !this.state.addModalOpen
        });
    };

    toggleEditModal = (id) => {
      this.setState({
        id:id,
      }, () => {
        this.setState({editModalOpen: !this.state.editModalOpen})
      });
    };

  handlePageChange = (pageNumber) => {
    //console.log(`active page is ${pageNumber}`);
    //this.setState({activePage: pageNumber});
    this.setState({loading:true});
    let { all, dispatch, history } = this.props
    all(pageNumber)
    .then(res => {
      dispatch({type:actions.ALL_VEHICULES, payload:res.data.data});
      this.setState({
        activePage: res.data.meta.current_page,
        itemsCountPerPage: res.data.meta.per_page,
        totalItemsCount: res.data.meta.total
      })
    })
    .catch(e => msg.errorHandler(e, dispatch, history))
    .finally(() => this.setState({loading:false}));
  }

  render() {
    const { addModalOpen, editModalOpen } = this.state;
    const {vehicules} = this.props; 
    return (
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Véhicules
                </h1>

                <div className="text-zero top-right-button-container">
                  <Can I="add" a="Vehicules">
                    <Button
                        color="primary"
                        size="lg"
                        className="top-right-button mr-1"
                        onClick={this.toggleAddModal}
                    >
                        Ajouter
                    </Button>
                  </Can> 
                </div>
            
                <Breadcrumb match={this.props.match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                className="pt-0 pl-0 d-inline-block d-md-none"
                //onClick={this.toggleDisplayOptions}
                >
                Options{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>

              <Collapse
                id="displayOptions"
                className="d-md-block mb-2"
                //isOpen={this.state.displayOptionsIsOpen}
                >
                <div className="d-block d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      OrderBy
                      {/*orderColumn ? orderColumn.label : ""*/}
                    </DropdownToggle>
                    <DropdownMenu>
                      {/*orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })*/}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      //placeholder={messages["menu.search"]}
                      //defaultValue={searchKeyword}
                      //onKeyPress={e => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            
            <Separator className="mb-5" />
            {
              this.state.loading ?
              (
                <div className="loading" />
              )
              :
              <>
              {
                  vehicules.length > 0 ?
                  <>
                        <Row>   
                        {
                            vehicules.map((r,i) => {
                            return (
                                <VehiculeListItem
                                    key={i} 
                                    data={r} 
                                    toggleEditModal={this.toggleEditModal} 
                                    handleDelete={this.handleDelete}
                                />
                            )
                            })
                        }    
                        </Row>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            innerClass="pagination justify-content-center"
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </>
                :null
            }
            </>
            }
          </Colxx>
        </Row>
        
        {/*<VehiculeMenu />*/}
        <Can I="add" a="Vehicules">
          <AddVehicule
            toggleModal={this.toggleAddModal}
            modalOpen={addModalOpen}
            history={this.props.history}
            user={this.props.user}
          />
        </Can>
        <Can I="edit" a="Vehicules">
          <EditVehicule
            toggleModal={this.toggleEditModal}
            modalOpen={editModalOpen}
            history={this.props.history}
            id={this.state.id}
          />
        </Can>
    </Fragment>
    )
  }
}

  const mapStateToProps = state => {
    return {
      vehicules: state.VehiculeReducer.vehicules,
      user: state.AuthReducer.user
    }
  }
  
  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      all: (n) => actionsCreator.all(n),
      deleted: (id) => actionsCreator.deleted(id)
    }
  }

export default injectIntl(connect(mapStateToProps, mapDispatchToProsps)(Vehicule));