import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import './scss/app.scss'

const Cart = React.lazy(() => import(
    /* webpackChunkName: "Cart" */
    "./pages/Cart"
    ))
const FullPizza = React.lazy(() => import(
    /* webpackChunkName: "FullPizza" */
    "./pages/FullPizza"
    ))
const NotFound = React.lazy(() => import(
    /* webpackChunkName: "NotFound" */
    "./pages/NotFound"
    ))

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route
                        path={"/"}
                        element={<Home/>}
                    />
                    <Route
                        path={"/cart"}
                        element={
                            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                                <Cart/>
                            </Suspense>
                        }
                    />
                    <Route
                        path={"/pizza/:id"}
                        element={
                            <Suspense fallback={<div>Идет загрузка страницы...</div>}>
                                <FullPizza/>
                            </Suspense>
                        }
                    />
                    <Route
                        path={"*"}
                        element={
                            <Suspense fallback={<div>Идет загрузка...</div>}>
                                <NotFound/>
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
