import * as actions from "../actions/type";

const initSate = {
  annonces : []
};

const AnnonceReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_ANNONCES: {
        return { ...state, annonces: action.payload };
    }
  
    case actions.GET_ANNONCES: {

      return { ...state, annonces: action.payload };
    }

    case actions.CREATE_ANNONCE: {
      return { ...state, annonces: [{...action.payload},...state.annonces] };
    }

    case actions.EDIT_ANNONCE: {
      let annonce = action.payload;
      let annonces = state.annonces.map( u => {
        if(u.id === annonce.id){
          return {...annonce}
        }
        return {...u}
      });
      return { ...state, annonces: annonces};
    }
    case actions.ANNONCE_DETAIL: {
      let annonces = state.annonces.filter( v => v.id !== action.payload);
      return { ...state, annonces: annonces };
    }

    case actions.DELETE_ANNONCE: {
      let annonces = state.annonces.filter( v => v.id !== action.payload);
      return { ...state, annonces };
    }
    default:{
      return state;
    }
  }
};

export default AnnonceReducer;