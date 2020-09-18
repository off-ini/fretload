import * as actions from "../actions/type";

const initSate = {
  marchandises : []
};

const MarchandiseReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_MARCHANDISES: {
        return { ...state, marchandises: action.payload };
    }
  
    case actions.GET_MARCHANDISES: {

      return { ...state, marchandises: action.payload };
    }

    case actions.CREATE_MARCHANDISE: {
      return { ...state, marchandises: [{...action.payload},...state.marchandises] };
    }

    case actions.EDIT_MARCHANDISE: {
      let marchandise = action.payload;
      let marchandises = state.marchandises.map( u => {
        if(u.id === marchandise.id){
          return {...marchandise}
        }
        return {...u}
      });
      return { ...state, marchandises: marchandises};
    }
    case actions.MARCHANDISE_DETAIL: {
      let marchandises = state.marchandises.filter( v => v.id !== action.payload);
      return { ...state, marchandises: marchandises };
    }

    case actions.DELETE_MARCHANDISE: {
      let marchandises = state.marchandises.filter( v => v.id !== action.payload);
      return { ...state, marchandises };
    }
    default:{
      return state;
    }
  }
};

export default MarchandiseReducer;