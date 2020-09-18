import * as actions from "../actions/type";

const initSate = {
  recivers : []
};

const ReciversReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_RECIVERS: {
        return { ...state, recivers: action.payload };
    }
  
    case actions.GET_RECIVERS: {

      return { ...state, recivers: action.payload };
    }

    case actions.CREATE_RECIVER: {
      return { ...state, recivers: [{...action.payload},...state.recivers] };
    }

    case actions.EDIT_RECIVER: {
      let reciver = action.payload;
      let recivers = state.recivers.map( u => {
        if(u.id === reciver.id){
          return {...reciver}
        }
        return {...u}
      });
      return { ...state, recivers: recivers};
    }
    case actions.RECIVER_DETAIL: {
      let recivers = state.recivers.filter( v => v.id !== action.payload);
      return { ...state, recivers: recivers };
    }

    case actions.DELETE_RECIVER: {
      let recivers = state.recivers.filter( v => v.id !== action.payload);
      return { ...state, recivers };
    }
    default:{
      return state;
    }
  }
};

export default ReciversReducer;