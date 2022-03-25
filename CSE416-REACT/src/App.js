import './App.css';
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/registerPage';
import HomePage from './pages/HomePage/homePage';
import UserProfilePage from './pages/UserProfilePage/userProfilePage';
import QuizTakingPage from './pages/QuizTakingPage/quizTakingPage';
import QuizCreationPage from './pages/QuizCreationPage/quizCreationPage';
import QuizDescriptionPage from './pages/QuizDescriptionPage/quizDescriptionPage';
import QuizManagementPage  from './pages/QuizManagementPage/quizManagementPage';
import SearchResultPage from './pages/SearchResultPage/searchResultPage';
import QuizEditingPage from './pages/QuizEditingPage/quizEditingPage';
import CategoryPage from './pages/CategoryPage';
import ForumPostPage from './pages/ForumPostPage/forumPostPage';
import ResetPasswordPage from './pages/ResetPassword/resetPasswordPage';
import { Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context'
import 'bootstrap' 
import NavBar from './components/NavBar';
import CategoryLeaderboardPage from './pages/CategoryLeaderboardPage';
import { SearchContextProvider } from './context/search-context';
import SubscriptionPage from './pages/SubscriptionPage';
import TakeLaterPage from './pages/TakeLaterPage';
import LikeQuizPage from './pages/LikeQuizPage/likeQuizPage';
import SettingPage from './pages/SettingPage/settingPage';
import HistoryPage from './pages/HistoryPage/historyPage';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <SearchContextProvider>
          <div className = "navbarHeader">
            <NavBar/>
          </div>

          <div className = "mainPageContainer">
          <Switch>
            <Route exact path='/' component = {HomePage}/>
            <Route path='/login' component = {LoginPage}/>
            <Route path='/register' component = {RegisterPage}/>
            <Route path='/profile/:userId' component = {UserProfilePage}/>
            <Route path='/quizTaking/:quizId' component = {QuizTakingPage}/>
            <Route path='/quizCreation' component = {QuizCreationPage}/>
            <Route path='/quizDescription/:quizId' component = {QuizDescriptionPage}/>
            <Route path='/quizManagement' component={QuizManagementPage}/>
            <Route path='/searchResult' component = {SearchResultPage}/>
            <Route path='/quizEditing/:quizId' component = {QuizEditingPage}/>
            <Route path='/forgetPassword' component = {ResetPasswordPage}/>
            <Route path='/forumPost/:forumPostId' component = {ForumPostPage}/>
            <Route path='/subscription' component={SubscriptionPage}/>
            <Route path='/takelater' component={TakeLaterPage}/>
            <Route path='/likequizzes' component={LikeQuizPage}/>
            {/* <Route path='/community'/> */}
            {/* <Route path='/leaderboard/:leaderboardId' component = {ChannelLeaderboardPage}/> */}
            <Route path='/global/:userId' component={CategoryLeaderboardPage}/> {/*userId means categoryId in this case */}
            <Route path='/category/:categoryId' component = {CategoryPage}/>
            <Route path='/setting' component={SettingPage}/>
            <Route path='/history' component={HistoryPage}/>
          </Switch>
          </div>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
