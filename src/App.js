import Display from './components/Display';
import Form from './components/Form';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Form />}/>
        <Route path='/display/:type/:id' element={<Display />}/>
      </Routes>
    </div>
    </BrowserRouter>
    // <div>
    //   <Display />
    //   <Form />
    // </div>

  );
}

export default App;
