import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Main from "./views/Main";
import Basket from "./views/Basket";
import Kabinet from "./views/Kabinet";
import ModalBox from "./components/ModalBox";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AddProduct from "./components/AddProduct";
import Basket from './views/Basket';




function App() {
    const[page, setPage] = useState('Main');
    const[modalBox, setModalBox] = useState('none')
    const [basket, setBasket] = useState([])



    const pages = {
        Main: <Main />,
        Basket: <Basket basket={basket} setBasket={setBasket} />,
        Kabinet: <Kabinet />

    }

    const modalBoxes = {
        none: null,
        Login: <ModalBox setModalBox = {setModalBox} ><Login /></ModalBox>,
        Registration: <ModalBox setModalBox = {setModalBox}><Registration /></ModalBox>,
        AddProduct: <ModalBox setModalBox = {setModalBox}><AddProduct /></ModalBox>
    }



  return (
    <div className="App">
        <Header setPage={ setPage } setModalBox={setModalBox}  />
        { pages[page] }
        { modalBoxes[modalBox] }
        <Footer />
    </div>
  );
}

export default App;
