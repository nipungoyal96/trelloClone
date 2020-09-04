import './styles/cardContainer.css';

import React, {  useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Draggable,Droppable} from 'react-beautiful-dnd'

import Card from './Card';
import * as addCardAction from '../store/actions/addCard';
import * as addListAction from '../store/actions/addLists';

import TextEditor from './TextEditor';

const CardContainer = (props) => {
    const dispatch=useDispatch();
    const cards=useSelector(state=>state.cards[props.listId]);
   
    const [cardDelted,setCardDelted] = useState(false);
    if(cardDelted){
        setCardDelted(false)
    }
    
    const [addCard,setAddCard] = useState(false);
    const [newCardText,setNewCardText] = useState('');
    const addNewCard = () => {
         setAddCard(true)
    }

    const addCardToList = () => {
        setAddCard(false);
       
        dispatch(addCardAction.addCard(props.listId,{
            cardId:Date.now().toString(),text:newCardText
        }))
        setNewCardText('');
    }
    const cancelCard = () =>{
        setAddCard(false)
    }
    const changeTitle = () => {
        setEditTitle(true)
    }

    const doneEditingTitle = () =>{
        setEditTitle(false);
        dispatch(addListAction.updateTitle({
            listId:props.listId,
            index:props.index,
            title:title
        }))
    }

    const deleteList = () =>{
        dispatch(addListAction.deleteList(
            props.index
        ))

        props.onDeleteList()
    }
    const [title,setTitle] = useState(props.title);
    const [editTitle,setEditTitle] = useState(false);

 
         
    return(
        <Draggable draggableId={props.listId.toString()} index={props.index}>
            {(provided, snapshot) => (
        <div className="Container"
        ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            {!editTitle && <div className="Title" onClick={changeTitle}>{title}</div>}
            {editTitle && <div className="TitleEdit" > <input type="text" className="titleTextBox" value={title} onChange={(e)=> setTitle(e.target.value)}/>
          <FontAwesomeIcon icon={faCheck} onClick={doneEditingTitle} />
            <FontAwesomeIcon icon={faTrash} onClick={deleteList} />
            
            </div>}
            <Droppable droppableId={props.listId}>
            {(provided, _snapshot) => (
                <div ref={provided.innerRef}>
            {cards && cards.map((card,index)=>(
                <Card key={card.cardId} index={index} listId={props.listId} cardId={card.cardId} onDelete={()=>{setCardDelted(true)}} text={card.text}/>
            ))}
            
            {provided.placeholder}
            </div>
            )}
            </Droppable>
            {
                addCard && 
                <TextEditor setTextField={(e)=> setNewCardText(e.target.value)} value={newCardText} firstButtonClick={addCardToList} secondButtonClick={cancelCard } firstButtonText="Add Card" secondButtonText="Cancel"/>
                
            }
            <div className="ButtonContainer">
            <button className="Button" onClick={addNewCard}>Add New Card</button>

            </div>
            
        </div>
            )}
        </Draggable>
    )
}

export default CardContainer;