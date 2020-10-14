import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AnnonceActions';
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
import APIModel from "../../models/APIModel";

import AddAnnonce from './AddAnnonce';
import EditAnnonce from './EditAnnonce';
import AnnonceListItem from './AnnonceListItem';
//import AnnonceMenu from './AnnonceMenu';

class Annonce extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            addModalOpen: false,
            editModalOpen: false,
            propositionModalOpen: false,
            lastChecked: null,
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            id:null,
            annonce_id:null,
            annonce_news:null,

            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            loading:false,
        };
    }

    componentDidMount()
    {
        this.all();
        this.annonce_news();
    }

    all()
    {
      this.setState({loading:true});
        let { all, dispatch, history } = this.props
        all().then(res => {
        dispatch({type:actions.ALL_ANNONCES, payload:res.data.data});
        this.setState({
          activePage: res.data.meta.current_page,
          itemsCountPerPage: res.data.meta.per_page,
          totalItemsCount: res.data.meta.total
        })
        }).catch(e => msg.errorHandler(e, dispatch, history))
        .finally(() => this.setState({loading:false}));
    }

    annonce_news = () => {
      this.setState({loading:true});
      let { dispatch, history } = this.props;
      axios.get(APIModel.HOST + "annonces/news")
            .then(res => {
              this.setState({annonce_news:res.data.data}, () => {
              });
            })
            .catch(e => {
              msg.errorHandler(e,dispatch,history)
            })
            .finally(() => this.setState({loading:false}));
    }

    handleDelete = (id) => {
      let { deleted, dispatch, history } = this.props
      deleted(id).then(res => {
        dispatch({type:actions.DELETE_ANNONCE, payload:res.data.id});
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

    togglePropositionModal = (id) => {
      this.setState({
        annonce_id:id,
      }, () => {
        this.setState({propositionModalOpen: !this.state.propositionModalOpen})
      });
    };

  handlePageChange = (pageNumber) => {
    //console.log(`active page is ${pageNumber}`);
    //this.setState({activePage: pageNumber});
    this.setState({loading:true});
    let { all, dispatch, history } = this.props
    all(pageNumber)
    .then(res => {
      dispatch({type:actions.ALL_ANNONCES, payload:res.data.data});
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
    const { addModalOpen, editModalOpen, propositionModalOpen } = this.state;
    const {annonces} = this.props; 
    return (
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Annonces
                </h1>

                <div className="text-zero top-right-button-container">
                  <Can I="add" a="Annonces">
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
                  annonces.length > 0 ?
                  <>
                          <Row>   
                          {
                              annonces.map((r,i) => {
                              return (
                                  <AnnonceListItem
                                      key={i} 
                                      data={r}
                                      show={true}
                                      user={this.props.user} 
                                      toggleEditModal={this.toggleEditModal} 
                                      togglePropositionModal={this.togglePropositionModal}
                                      handleDelete={this.handleDelete}
                                      annonce_news={this.state.annonce_news ? this.state.annonce_news : null}
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
        
        {/*<AnnonceMenu />*/}
        <Can I="add" a="Annonces">
          <AddAnnonce
            toggleModal={this.toggleAddModal}
            modalOpen={addModalOpen}
            history={this.props.history}
            user={this.props.user}
            show={true}
            position="right"
          />
        </Can>
        <Can I="edit" a="Annonces">
          <EditAnnonce
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
      annonces: state.AnnonceReducer.annonces,
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProsps)(Annonce));
