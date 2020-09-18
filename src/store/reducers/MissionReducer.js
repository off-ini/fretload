import * as actions from "../actions/type";

const initSate = {
  missions : []
};

const MissionReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_MISSIONS: {
        return { ...state, missions: action.payload };
    }
  
    case actions.GET_MISSIONS: {

      return { ...state, missions: action.payload };
    }

    case actions.CREATE_MISSION: {
      return { ...state, missions: [{...action.payload},...state.missions] };
    }

    case actions.EDIT_MISSION: {
      let mission = action.payload;
      let missions = state.missions.map( u => {
        if(u.id === mission.id){
          return {...mission}
        }
        return {...u}
      });
      return { ...state, missions: missions};
    }
    case actions.MISSION_DETAIL: {
      let missions = state.missions.filter( v => v.id !== action.payload);
      return { ...state, missions: missions };
    }

    case actions.DELETE_MISSION: {
      let missions = state.missions.filter( v => v.id !== action.payload);
      return { ...state, missions };
    }
    default:{
      return state;
    }
  }
};

export default MissionReducer;