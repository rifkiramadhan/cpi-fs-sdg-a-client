import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, HomePage, Login, Register, CategoryList, DiscussionPage, AddDiscussionPage, AddNewCategory, UpdateCategory } from './components';
import EditDiscussionPage from './components/DiscussionPage/EditDiscussion';
import NotFound from './components/Navigation/Not Found/NotFound';
import Logout from './components/Users/Login/Logout';
import { selectUser } from './redux/slices/users/usersSlices';

const App = () => {
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<CategoryList />} />
        <Route path='/categories/add' element={<AddNewCategory />} />
        <Route path='/categories/:id/edit' element={<UpdateCategory />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/discussion/:id' element={<DiscussionPage/>}/>
        <Route path='/discussion/:id/edit' element={<EditDiscussionPage/>}/>
        <Route path='/discussion/add' element={<AddDiscussionPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
