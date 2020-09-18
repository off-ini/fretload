import * as actions from "../actions/type";

const initSate = {
  vehicules : []
};

const VehiculeReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_VEHICULES: {
        return { ...state, vehicules: action.payload };
    }
  
    case actions.GET_VEHICULES: {

      return { ...state, vehicules: action.payload };
    }

    case actions.CREATE_VEHICULE: {
      return { ...state, vehicules: [{...action.payload},...state.vehicules] };
    }

    case actions.EDIT_VEHICULE: {
      let vehicule = action.payload;
      let vehicules = state.vehicules.map( u => {
        if(u.id === vehicule.id){
          return {...vehicule}
        }
        return {...u}
      });
      return { ...state, vehicules: vehicules};
    }
    case actions.VEHICULE_DETAIL: {
      let vehicules = state.vehicules.filter( v => v.id !== action.payload);
      return { ...state, vehicules: vehicules };
    }

    case actions.DELETE_VEHICULE: {
      let vehicules = state.vehicules.filter( v => v.id !== action.payload);
      return { ...state, vehicules };
    }
    default:{
      return state;
    }
  }
};

export default VehiculeReducer;