import './styles/lists.css'
import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {DragDropContext,Droppable} from 'react-beautiful-dnd';

import CardContainer from './CardContainer';
import * as addListsAction from '../store/actions/addLists';
import * as addCardAction from '../store/actions/addCard';
const Lists = (props) => {

    const dispatch = useDispatch();
    const addNewList = () => {
        dispatch(addListsAction.addLists({
            listId:Date.now(),
            title:'title'
        }))
    }
    const [listDeleted,setListDeleted] = useState(false);
    if(listDeleted)
    setListDeleted(false)
    const lists = useSelector(state => state.lists.lists)
    const dragEnd = ({ source, destination, type }) => {
        
        if(!destination)
        return ;
        if(type === "COLUMN"){
            if(source.index !== destination.index){
                dispatch(addListsAction.moveLists({
                    oldListIndex:source.index,
                    newListIndex:destination.index
                }))
            }
            return
        }

        if(source.index !== destination.index || source.droppableId !== destination.droppableId){
            dispatch(addCardAction.moveCard({
                sourceListId:source.droppableId,
                destinationListId:destination.droppableId,
                oldCardIndex:source.index,
                newCardIndex:destination.index
            }))
        }
    }
    return(
        <DragDropContext onDragEnd={dragEnd} >
            <Droppable droppableId="lists" direction="horizontal" type="COLUMN">
                {(provided)=>(

    
        <div className="mainContainer" {...provided.droppableProps} ref={provided.innerRef}>
            {
                lists.map((list,index)=>{
                    return <CardContainer index={index} key={list.listId.toString()} onDeleteList={()=>setListDeleted(true)}listId={list.listId.toString()} title={list.title}/>
                })
                
            }
            {provided.placeholder}
            <div>
            <button className="Button" onClick={addNewList}>Add New List</button>
            </div>
        </div>
        )}
        </Droppable>
        </DragDropContext>
    )
}


export default Lists;