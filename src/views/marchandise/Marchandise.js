import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MarchandiseActions';
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

import AddMarchandise from './AddMarchandise';
import EditMarchandise from './EditMarchandise';
import MarchandiseListItem from './MarchandiseListItem';
import MarchandiseMenu from './MarchandiseMenu';
import AddAnnonce from '../annonce/AddAnnonce';

class Marchandise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            addModalOpen: false,
            annonceModalOpen: false,
            editModalOpen: false,
            lastChecked: null,
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            id:null,
            marchandise_id:null,

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
        dispatch({type:actions.ALL_MARCHANDISES, payload:res.data.data});
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
        dispatch({type:actions.DELETE_MARCHANDISE, payload:res.data.id});
        msg.successHandler(msg.SUCCESS_TITLE, msg.DELETE_SUCCESS);
      }).catch(e => msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.DELETE_ERROR))
    }

    toggleAddModal = () => {
        this.setState({
          addModalOpen: !this.state.addModalOpen
        });
    };

    toggleAnnonceModal = (id) => {
      this.setState({
        marchandise_id:id,
      }, () => {
        this.setState({
          annonceModalOpen: !this.state.annonceModalOpen
        });
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
      dispatch({type:actions.ALL_MARCHANDISES, payload:res.data.data});
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
    const { addModalOpen, editModalOpen, annonceModalOpen } = this.state;
    const {marchandises} = this.props; 
    return (
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Marchandises
                </h1>

                <div className="text-zero top-right-button-container">
                <Can I="add" a="Marchandises">
                    <Button
                        color="primary"
                        size="lg"
                        className="top-right-button mr-1"
                        onClick={this.toggleAddModal}
                    >
                        Ajouter
                    </Button>
                </Can >   
                </div>
            
                <Breadcrumb match={this.props.match} />
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
                    marchandises.length > 0 ?
                    <>
                        <Row>   
                          {
                              marchandises.map((r,i) => {
                              return (
                                  <MarchandiseListItem
                                      key={i} 
                                      data={r} 
                                      toggleEditModal={this.toggleEditModal} 
                                      handleDelete={this.handleDelete}
                                      toggleAnnonceModal={this.toggleAnnonceModal}
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
        
        {/*<MarchandiseMenu />*/}
        <Can I="add" a="Marchandises">
          <AddMarchandise
            toggleModal={this.toggleAddModal}
            modalOpen={addModalOpen}
            history={this.props.history}
            user={this.props.user}
          />
        </Can>
        <Can I="edit" a="Marchandises">
          <EditMarchandise
            toggleModal={this.toggleEditModal}
            modalOpen={editModalOpen}
            history={this.props.history}
            id={this.state.id}
          />
        </Can>
        
        <AddAnnonce
          toggleModal={this.toggleAnnonceModal}
          modalOpen={annonceModalOpen}
          history={this.props.history}
          user={this.props.user}
          id={this.state.marchandise_id}
        />
    </Fragment>
    )
  }
}

const mapStateToProps = state => {
    return {
      marchandises: state.MarchandiseReducer.marchandises,
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProsps)(Marchandise));