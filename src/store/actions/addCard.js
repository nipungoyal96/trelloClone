export const ADD_CARD = 'ADD_CARD';

export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';


export const addCard = (listId,payload) =>{

    return{
        type:ADD_CARD,
        listId:listId,
        payload:payload
    }
}

export const moveCard = (payload) => {
    return{
        type:MOVE_CARD,
        payload:payload
    }
}

export const editCard=(payload)=>{
    return{
        type:EDIT_CARD,
        payload:payload
    }
}

export const deleteCard=(payload)=>{
    return{
        type:DELETE_CARD,
        payload:payload
    }
}