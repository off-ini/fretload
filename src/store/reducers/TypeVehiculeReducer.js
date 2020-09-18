import * as actions from "../actions/type";

const initSate = {
  tvehicules : []
};

const TypeVehiculeReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_T_VEHICULES: {
        return { ...state, tvehicules: action.payload };
    }
  
    case actions.GET_T_VEHICULES: {

      return { ...state, tvehicules: action.payload };
    }

    case actions.CREATE_T_VEHICULE: {
      return { ...state, tvehicules: [{...action.payload},...state.tvehicules] };
    }

    case actions.EDIT_T_VEHICULE: {
      let tvehicule = action.payload;
      let tvehicules = state.tvehicules.map( u => {
        if(u.id === tvehicule.id){
          return {...tvehicule}
        }
        return {...u}
      });
      return { ...state, tvehicules: tvehicules};
    }
    case actions.T_VEHICULE_DETAIL: {
      let tvehicules = state.tvehicules.filter( v => v.id !== action.payload);
      return { ...state, tvehicules: tvehicules };
    }

    case actions.DELETE_T_VEHICULE: {
      let tvehicules = state.tvehicules.filter( v => v.id !== action.payload);
      return { ...state, tvehicules };
    }
    default:{
      return state;
    }
  }
};

export default TypeVehiculeReducer;