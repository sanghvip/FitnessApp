interface State {
    isLoading:boolean;
}

const initialState: State = {
    isLoading: false
};

export function appReducer(state = initialState,action){
    return state;
}