

export const ADD_LISTS = 'ADD_LISTS';

export const MOVE_LISTS = 'MOVE_LISTS';
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const DELETE_LISTS = 'DELETE_LISTS';
export const addLists = (payload) =>{
   
    return{
        type:ADD_LISTS,
        payload:payload
    }
}

export const moveLists = (payload) =>{
   
    return{
        type:MOVE_LISTS,
        payload:payload
    }
}

export const updateTitle = (payload) =>{
    return{
        type:UPDATE_TITLE,
        payload:payload
    }
}

export const deleteList = (index) =>{
    
    return{
        type:DELETE_LISTS,
        index:index
    }
}