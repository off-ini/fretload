import * as actions from "../actions/type";

const initSate = {
  mpayements : []
};

const ModePayementReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_M_PAYEMENTS: {
        return { ...state, mpayements: action.payload };
    }
  
    case actions.GET_M_PAYEMENTS: {

      return { ...state, mpayements: action.payload };
    }

    case actions.CREATE_M_PAYEMENT: {
      return { ...state, mpayements: [{...action.payload},...state.mpayements] };
    }

    case actions.EDIT_M_PAYEMENT: {
      let mpayement = action.payload;
      let mpayements = state.mpayements.map( u => {
        if(u.id === mpayement.id){
          return {...mpayement}
        }
        return {...u}
      });
      return { ...state, mpayements: mpayements};
    }
    case actions.M_PAYEMENT_DETAIL: {
      let mpayements = state.mpayements.filter( v => v.id !== action.payload);
      return { ...state, mpayements: mpayements };
    }

    case actions.DELETE_M_PAYEMENT: {
      let mpayements = state.mpayements.filter( v => v.id !== action.payload);
      return { ...state, mpayements };
    }
    default:{
      return state;
    }
  }
};

export default ModePayementReducer;