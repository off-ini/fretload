import React, { Component, Fragment } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/DefaultLayout/navs/Breadcrumb";
import Pagination from "react-js-pagination";
import Pusher from 'pusher-js';

import * as actions from '../../store/actions/type';
import * as annonceCreator from '../../store/actions/AnnonceActions';
import * as msg from '../../utils/messages';
import APIModel from "../../models/APIModel";

import AnnonceListItem from '../annonce/AnnonceListItem';

class Dashboard extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      propositionModalOpen: false,
      id:null,
      annonce_id:null,
      annonce_news:[],

      activePage: 1,
      itemsCountPerPage: 1,
      totalItemsCount: 1,
      loading:false,
    };
  }

  componentDidMount = () => {
    this.all();
    this.annonce_news();
    this.push();
  };

  componentWillReceiveProps = (nextProps) => {
    let annonce_news = this.state.annonce_news;
    if(annonce_news && annonce_news.length > 0)
    {
        annonce_news = [nextProps.annonces[0], ...annonce_news];
        this.setState({
          annonce_news
        })
    }
  }

  all = () =>
  {
    this.setState({loading:true});
      let { allAnnonce, dispatch, history } = this.props
      allAnnonce().then(res => {
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
  
  push = () => {
    let { dispatch, user } = this.props
    Pusher.logToConsole = true;

    var pusher = new Pusher('fdd79a640f3e479ff6aa', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('channel-annonce');
    channel.bind('event-annonce',
      function(data) {
        console.log(data.data);
        if(user.id > 2)
        {
          dispatch({
            type:actions.CREATE_ANNONCE, 
            payload:data.data
          });
        }
      }
    );
  }

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
    let { allAnnonce, dispatch, history } = this.props
    allAnnonce(pageNumber)
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
    const { propositionModalOpen } = this.state;
    const {annonces} = this.props; 

    return (
      <>
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Tableau de board" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" className="mb-4">
            
          </Colxx>
          <Colxx xxs="12" lg="6" className="mb-4 white">
            <Card className="mb-4">
              <CardBody>
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
                                      show={false}
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
    annonces: state.AnnonceReducer.annonces,
    user: state.AuthReducer.user
  }
}

const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
    allAnnonce: (n) => annonceCreator.all(n),
  }
}

export default connect(mapStateToProps, mapDispatchToProsps)(Dashboard);
