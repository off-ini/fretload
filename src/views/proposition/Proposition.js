import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/PropositionActions';
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

//import AddProposition from './AddProposition';
//import EditProposition from './EditProposition';

import Edit2Proposition from './Edit2Proposition';
import PropositionListItem from './PropositionListItem';


{/*import PropositionMenu from './PropositionMenu';*/}

class Proposition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            addModalOpen: false,
            editModalOpen: false,
            edit2ModalOpen: false,
            lastChecked: null,
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            id:null,
            annonce_id:null,
            user_id:null,

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
        dispatch({type:actions.ALL_PROPOSITIONS, payload:res.data.data});
        this.setState({
          activePage: res.data.meta.current_page,
          itemsCountPerPage: res.data.meta.per_page,
          totalItemsCount: res.data.meta.total
        })
        }).catch(e => msg.errorHandler(e, dispatch, history))
        .finally(() => this.setState({loading:false}));
    }

    handleAccept = (id) => {
      let { dispatch, history } = this.props;
      axios.get(APIModel.HOST + "propositions/accept/"+id)
            .then(res => {
              dispatch({
                type:actions.EDIT_PROPOSITION, 
                payload:res.data
              });
            })
            .catch(e => {
              msg.errorHandler(e,dispatch,history)
            });
    }

    handleDelete = (id) => {
      let { deleted, dispatch, history } = this.props
      deleted(id).then(res => {
        dispatch({type:actions.DELETE_PROPOSITION, payload:res.data.id});
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

    toggleEdit2Modal = (annonce_id, user_id) => {
      this.setState({
        annonce_id:annonce_id,
        user_id:user_id
      }, () => {
        this.setState({edit2ModalOpen: !this.state.edit2ModalOpen})
      });
    };

  handlePageChange = (pageNumber) => {
    //console.log(`active page is ${pageNumber}`);
    //this.setState({activePage: pageNumber});
    this.setState({loading:true});
    let { all, dispatch, history } = this.props
    all(pageNumber)
    .then(res => {
      dispatch({type:actions.ALL_PROPOSITIONS, payload:res.data.data});
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
    const { addModalOpen, editModalOpen, edit2ModalOpen, annonce_id, user_id } = this.state;
    const {propositions} = this.props; 
    return (
<>
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Propositions
                </h1>

                <div className="text-zero top-right-button-container">
                <Can I="add" a="Propositions">
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

            
            <Separator className="mb-5" />
            {
              this.state.loading ?
              (
                <div className="loading" />
              )
              :
              <>
              {
                  propositions.length > 0 ?
                  <>
                        <Row>   
                        {
                            propositions.map((r,i) => {
                            return (
                                <PropositionListItem
                                    key={i} 
                                    data={r} 
                                    toggleEditModal={this.toggleEdit2Modal} 
                                    handleDelete={this.handleDelete}
                                    checked={r.is_accept}
                                    handleAccept={this.handleAccept}
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
    </Fragment>
    <Edit2Proposition
      toggleModal={this.toggleEdit2Modal}
      modalOpen={edit2ModalOpen}
      annonce_id={annonce_id}
      user_id={user_id}
      history={this.props.history}
    />

</>
    )
  }
}

const mapStateToProps = state => {
    return {
      propositions: state.PropositionReducer.propositions,
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProsps)(Proposition));
