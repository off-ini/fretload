import * as actions from "../actions/type";

const initSate = {
  tmarchandises : []
};

const TypeMarchandiseReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_T_MARCHANDISES: {
        return { ...state, tmarchandises: action.payload };
    }
  
    case actions.GET_T_MARCHANDISES: {

      return { ...state, tmarchandises: action.payload };
    }

    case actions.CREATE_T_MARCHANDISE: {
      return { ...state, tmarchandises: [{...action.payload},...state.tmarchandises] };
    }

    case actions.EDIT_T_MARCHANDISE: {
      let tmarchandise = action.payload;
      let tmarchandises = state.tmarchandises.map( u => {
        if(u.id === tmarchandise.id){
          return {...tmarchandise}
        }
        return {...u}
      });
      return { ...state, tmarchandises: tmarchandises};
    }
    case actions.T_MARCHANDISE_DETAIL: {
      let tmarchandises = state.tmarchandises.filter( v => v.id !== action.payload);
      return { ...state, tmarchandises: tmarchandises };
    }

    case actions.DELETE_T_MARCHANDISE: {
      let tmarchandises = state.tmarchandises.filter( v => v.id !== action.payload);
      return { ...state, tmarchandises };
    }
    default:{
      return state;
    }
  }
};

export default TypeMarchandiseReducer;