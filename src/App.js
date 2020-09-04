import React from 'react';

import './App.css';
import {useDispatch} from 'react-redux';

import * as addLists from './store/actions/addLists';

import Lists from './components/Lists'


function App() {
  
  const dispatch=useDispatch();

    
    dispatch(addLists.addLists({
        listId:Date.now(),
        title:'Title'
    }))

  return (
    <div className="App">
        
        <Lists/>
        
    </div>
  );
}

export default App;
