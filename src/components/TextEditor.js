import React from 'react'
import './styles/textEditor.css'

const TextEditor = (props) =>{

return(<div className="textInputContainer">
<input type="text" className="textInput" value={props.value} onChange={props.setTextField}/>
    <div className="buttonContainer">
    <button className="ButtonSave" onClick={props.firstButtonClick}>{props.firstButtonText}</button>
    <button className="ButtonCancel" onClick={props.secondButtonClick}>{props.secondButtonText}</button>
    </div>
    </div>)
}

export default TextEditor