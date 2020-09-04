import './styles/card.css';

import React,{useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd';
import {useDispatch} from 'react-redux';
import TextEditor from './TextEditor';

import * as addCardAction from '../store/actions/addCard';

const Card=(props)=>{
    const [editable,setEditable] = useState(false)
    const [editing,setEditing] = useState(false)
    const [text,setText] = useState(props.text)
    const dispatch = useDispatch();
    const hoverTrue=()=>{
        setEditable(true)
    }
    const hoverFalse=()=>{
        setEditable(false)
    }

    const deleteCard = () =>{
        setEditing(false);
      
     dispatch(addCardAction.deleteCard({
         listId:props.listId,
         index:props.index
     }))
     props.onDelete();
    }
    const saveText=()=>{
        setEditing(false);
      
     dispatch(addCardAction.editCard({
         listId:props.listId,
         cardId:props.cardId,
         text:text,
         index:props.index
     }))
    }
    if(editing ) return(
    <div>
        <TextEditor firstButtonText="Save" secondButtonText="Delete" value={text} setTextField={(e)=> setText(e.target.value)} firstButtonClick={saveText} secondButtonClick={deleteCard}/>
    </div>

    ) 
    return(
        <Draggable key={props.cardId} draggableId={props.cardId} index={props.index} >
        {(provided, snapshot) => (
        <div className="Card" {...provided.draggableProps}
        {...provided.dragHandleProps}
              ref={provided.innerRef}
              onMouseEnter={hoverTrue}
        onMouseLeave={hoverFalse}
              >
            
            {editable && <div className="Card-Icons">
                  <div className="Card-Icon" >
                  <FontAwesomeIcon onClick={()=>setEditing(true)} icon={faPencilAlt} />
                  </div>
            </div>}
            {text}
        </div>)}
        </Draggable>
    )
}

export default Card;