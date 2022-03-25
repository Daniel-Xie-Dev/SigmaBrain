import React from "react";
import App from "./App";
import { mount, shallow  } from "enzyme";
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/registerPage';
import HomePage from './pages/HomePage/homePage';
import UserProfilePage from './pages/UserProfilePage/userProfilePage';
import QuizTakingPage from './pages/QuizTakingPage/quizTakingPage';
import QuizCreationPage from './pages/QuizCreationPage/quizCreationPage';

describe('Test App Entry point', function() {
    it("renders App component without crashing", ()=>{
        shallow(<App/>)
    });

    it("renders LoginPage without crashing", ()=>{
        shallow(<LoginPage/>)
    });

    it("renders RegisterPage without crashing", ()=>{
        shallow(<RegisterPage/>)
    });

    it("renders HomePage without crashing", ()=>{
        shallow(<HomePage/>)
    });

    it("renders UserProfilePage without crashing", ()=>{
        shallow(<UserProfilePage/>)
    });

    it("renders QuizTakingPage without crashing", ()=>{
        shallow(<QuizTakingPage/>)
    });

    it("renders QuizCreationPage without crashing", ()=>{
        shallow(<QuizCreationPage/>)
    });
})

