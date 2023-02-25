import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './../../pages/About';
import Posts from './../../pages/Posts';
import Error from './../../pages/Error';
import PostIdPage from '../../pages/PostIdPage';
import Login from '../../pages/Login';
import { AuthContext } from '../../Context';

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    return (
        isAuth
            ?    
            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route  path="/posts/:id" element={<PostIdPage/>}/>
                <Route 
                    path="*"
                    element={
                        <Error/>
                    }
                />
                <Route 
                    path="/"
                    element={
                        <Posts/>
                    }
                />
            </Routes>
            :   
            <Routes>
                <Route 
                    path="*"
                    element={
                        <Login/>
                    }
                />
            </Routes>
        

    );
};

export default AppRouter;