import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MissionActions';
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

import MissionListItem from './MissionListItem';
//import MissionMenu from './MissionMenu';


import PayementMission from './PayementMission';

class Mission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            addModalOpen: false,
            annonceModalOpen: false,
            editModalOpen: false,
            payementModalOpen: false,
            lastChecked: null,
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            id:null,
            mission_id:null,
            mission_payement_id:null,

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
        dispatch({type:actions.ALL_MISSIONS, payload:res.data.data});
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
        dispatch({type:actions.DELETE_MISSION, payload:res.data.id});
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
        mission_id:id,
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

    togglePayementModal = (mission_payement_id) => {
      this.setState({
        mission_payement_id
      }, () => {
        this.setState({payementModalOpen: !this.state.payementModalOpen})
      });
    };

  handlePageChange = (pageNumber) => {
    //console.log(`active page is ${pageNumber}`);
    //this.setState({activePage: pageNumber});
    this.setState({loading:true});
    let { all, dispatch, history } = this.props
    all(pageNumber)
    .then(res => {
      dispatch({type:actions.ALL_MISSIONS, payload:res.data.data});
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
    const {mission_payement_id, payementModalOpen} = this.state;
    const {missions} = this.props; 
    return (
<>
    <Fragment>
        <Row className="">
          <Colxx xxs="12">
            <div className="mb-2">
                <h1>
                    Missions
                </h1>
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
                  missions.length > 0 ?
                    <>
                        <Row>   
                        {
                            missions.map((r,i) => {
                            return (
                                <MissionListItem
                                    key={i} 
                                    data={r} 
                                    handleDelete={this.handleDelete}
                                    togglePayementModal={this.togglePayementModal}
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
        
        {/*<MissionMenu />*/}
    </Fragment>
   
    <PayementMission 
      id={mission_payement_id}
      toggleModal={this.togglePayementModal}
      modalOpen={payementModalOpen}
    />
      
</>
    )
  }
}

const mapStateToProps = state => {
  return {
    missions: state.MissionReducer.missions,
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProsps)(Mission));