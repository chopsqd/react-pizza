import {createContext, useState} from "react";
import {Routes, Route} from "react-router-dom";
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const AppContext = createContext({})

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <AppContext.Provider value={{searchValue, setSearchValue}}>
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/cart"} element={<Cart/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
