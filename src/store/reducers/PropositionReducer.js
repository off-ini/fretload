import * as actions from "../actions/type";

const initSate = {
  propositions : []
};

const PropositionReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_PROPOSITIONS: {
        return { ...state, propositions: action.payload };
    }
  
    case actions.GET_PROPOSITIONS: {

      return { ...state, propositions: action.payload };
    }

    case actions.CREATE_PROPOSITION: {
      return { ...state, propositions: [{...action.payload},...state.propositions] };
    }

    case actions.EDIT_PROPOSITION: {
      let proposition = action.payload;
      let propositions = state.propositions.map( u => {
        if(u.id === proposition.id){
          return {...proposition}
        }
        return {...u}
      });
      return { ...state, propositions: propositions};
    }
    case actions.PROPOSITION_DETAIL: {
      let propositions = state.propositions.filter( v => v.id !== action.payload);
      return { ...state, propositions: propositions };
    }

    case actions.DELETE_PROPOSITION: {
      let propositions = state.propositions.filter( v => v.id !== action.payload);
      return { ...state, propositions };
    }
    default:{
      return state;
    }
  }
};

export default PropositionReducer;