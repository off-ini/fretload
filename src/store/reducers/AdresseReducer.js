import * as actions from "../actions/type";

const initSate = {
  adresses : []
};

const AdresseReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_ADRESSES: {
        return { ...state, adresses: action.payload };
    }
  
    case actions.GET_ADRESSES: {

      return { ...state, adresses: action.payload };
    }

    case actions.CREATE_ADRESSE: {
      return { ...state, adresses: [{...action.payload},...state.adresses] };
    }

    case actions.EDIT_ADRESSE: {
      let adresse = action.payload;
      let adresses = state.adresses.map( u => {
        if(u.id === adresse.id){
          return {...adresse}
        }
        return {...u}
      });
      return { ...state, adresses: adresses};
    }
    case actions.ADRESSE_DETAIL: {
      let adresses = state.adresses.filter( v => v.id !== action.payload);
      return { ...state, adresses: adresses };
    }

    case actions.DELETE_ADRESSE: {
      let adresses = state.adresses.filter( v => v.id !== action.payload);
      return { ...state, adresses };
    }
    default:{
      return state;
    }
  }
};

export default AdresseReducer;