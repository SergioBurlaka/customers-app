const addUser = function (state, action) {
   return [...state,...action.payload];
};


 export default function users(state = [], action) {
    switch (action.type){
        case 'ADD_USERS': return addUser(state, action);
        case 'DELETE_USER': return state.filter(item => action.userId !== item.id);
        default: return state;
    }
}
