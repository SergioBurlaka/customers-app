const initialState = {
        usersPerPage: 3,
        pages: 1,
        activePage: 1,
        usersToShow: []
};


const initPagination = function (state, users) {
    let activePage = initialState.activePage;
    let usersPerPage = state.usersPerPage;
    let newUsersToShow = usersToShow(activePage, usersPerPage, users);
    let pages = getNumberOfPages(users, usersPerPage);

    return Object.assign({}, state, {
        usersToShow: newUsersToShow,
        activePage: activePage,
        pages: pages
    })
};



const usersToShow = function(activePage, usersPerPage, users){
    let startItemOnPage = (activePage-1)*usersPerPage;
    let endItemOnPage = (activePage-1)*usersPerPage+usersPerPage;
        return users.slice(startItemOnPage, endItemOnPage);
};

const getNumberOfPages = function (users, usersPerPage ) {
    return Math.ceil(users.length/usersPerPage)
};

const calculatePagination = function(state, users){
    let activePage = state.activePage;
    let usersPerPage = state.usersPerPage;
    let pages = getNumberOfPages(users, usersPerPage);
    let newUsersToShow = usersToShow(activePage, usersPerPage, users);

    // console.log('activePage '+ activePage);
    // console.log('usersPerPage '+ usersPerPage);
    // console.log('pages '+ pages);
    // console.log('newUsersToShow ');
    // console.log( newUsersToShow);



    if(newUsersToShow.length === 0){
        activePage = activePage-1;
        newUsersToShow = usersToShow(activePage, usersPerPage, users);
    }

    return Object.assign({}, state, {
        usersPerPage: usersPerPage,
        pages: pages,
        activePage: activePage,
        usersToShow: newUsersToShow
    })
};




const setActivePage = function(state, action) {
    let activePage = action.activePage;
    let users = action.users;
    let usersPerPage = state.usersPerPage;
    let newUsersToShow = usersToShow(activePage, usersPerPage, users);

    return Object.assign({}, state, {
        activePage: activePage,
        usersToShow: newUsersToShow
    })

};

const  setUsersPerPage = function (state, payload) {


    let usersPerPage = payload.usersPerPage;
    let users = payload.users;
    let activePage = 1;

    if(usersPerPage === 'default'){
        usersPerPage = initialState.usersPerPage;
    }

    let pages = getNumberOfPages(users, usersPerPage);
    let newUsersToShow = usersToShow(activePage, usersPerPage, users);


    return Object.assign({}, state, {
        usersPerPage: usersPerPage,
        pages: pages,
        activePage: activePage,
        usersToShow: newUsersToShow
    })

};



export default function UsersTablePagination(state = initialState, action) {
    switch (action.type){
        case 'CALCULATE_PAGINATION': return  calculatePagination(state, action.payload);
        case 'SET_ACTIVE_PAGE': return  setActivePage(state, action.payload);
        case 'SET_USERS_PER_PAGE': return  setUsersPerPage(state, action.payload);
        case 'INIT_PAGINATION': return  initPagination(state, action.payload);
        default: return state;
    }
}
