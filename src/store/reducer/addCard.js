import {ADD_CARD,MOVE_CARD,EDIT_CARD, DELETE_CARD}  from '../actions/addCard'
const intialState = {
    
}

export default (state = intialState,action)=>{
    switch(action.type){
        case ADD_CARD:
        let newCards;   
        if(state[action.listId]) 
          newCards =state[action.listId].concat(action.payload)
          else
          newCards=[].concat(action.payload)
            return{
                ...state,
                [action.listId]:newCards
            }
          case MOVE_CARD:
          const  {oldCardIndex,newCardIndex,sourceListId,destinationListId} = action.payload
          if(sourceListId === destinationListId){
            const newCards = state[sourceListId];
            const [removedCards] = newCards.splice(oldCardIndex,1);
            newCards.splice(newCardIndex,0,removedCards);
            return{
              ...state,
              [sourceListId]:newCards
            }
          }

          const sourceCards= state[sourceListId];
          const [removedCard] = sourceCards.splice(oldCardIndex,1);
          const destinationCards = state[destinationListId]?state[destinationListId]:[];
          
          destinationCards.splice(newCardIndex,0,removedCard);
          return{...state,
          [sourceListId]:sourceCards,
        [destinationListId]:destinationCards
      }
      case EDIT_CARD:
        const newCard=state[action.payload.listId];
            const newCardItem={
                cardId:action.payload.cardId,
                text:action.payload.text
            }
            newCard.splice(action.payload.index,1,newCardItem);
            return{
              ...state,
                [action.payload.listId]:newCard
            }
          case DELETE_CARD:
            const cards = state[action.payload.listId];
            cards.splice(action.payload.index,1)
            return{
              ...state,
              [action.payload.listId]:cards
            }
          default:
          return state
    }
  
}