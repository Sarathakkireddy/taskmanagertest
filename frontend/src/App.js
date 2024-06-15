import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Home from './components/Home/Home';
import Viewtask from './components/Home/Viewtask';
import { AContext } from './context/acontext';
import { useState } from 'react';

function App() {
  const [usersdet,Setusers]=useState("");
  const [tasksdet,Settasks]=useState("");
  const [viewtask,Setviewtask]=useState("");
  const [comments,Setcomments]=useState("");
  const [load,Setload]=useState(1);
  let ustars=[];
  let cstars=[];
  return (
   <>
   <div>
   <AContext.Provider value={{usersdet,Setusers,tasksdet,Settasks,load,Setload,viewtask,Setviewtask,comments,Setcomments,ustars,cstars}}>
    <BrowserRouter>
      <Routes>
          <Route path='/*' element={<Landing/>}/>
          
          <Route path='/home' element={<Home/>}/>
          <Route path='/viewtask' element={<Viewtask/>}/>
          
         
          
      </Routes>
    </BrowserRouter>
    </AContext.Provider>
   </div>
   </>
  );
}

export default App;
