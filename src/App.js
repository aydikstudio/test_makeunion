import { useEffect, useState} from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList/TodoList';
import User from './pages/User/User';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
