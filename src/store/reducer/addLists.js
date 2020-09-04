import {ADD_LISTS, MOVE_LISTS,UPDATE_TITLE,DELETE_LISTS}  from '../actions/addLists'

const intialState = {
    lists:[]
}

export default (state = intialState,action)=>{
    switch(action.type){
        case ADD_LISTS:

            return{
                ...state,
                lists:state.lists.concat(action.payload)
            }
        case MOVE_LISTS:
                const newList = state.lists;
                const [removedListItems] = newList.splice(action.oldListIndex,1);
                newList.splice(action.payload.newListIndex,0,removedListItems);
                return { 
                    lists : newList
                }
        case UPDATE_TITLE:
            const newLists=state.lists;
            const newListItem={
                listId:action.payload.listId,
                title:action.payload.title
            }
            newLists.splice(action.payload.index,1,newListItem);
            return{
                ...state,
                lists:newLists
            }
            case DELETE_LISTS:
                const lists = state.lists;
                console.log(lists)
                lists.splice(action.index,1)
                return{
                  ...state,
                  lists:lists
                }
       default :
       return state;
    }
}