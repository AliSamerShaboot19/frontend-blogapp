import Header from "./components/Header/Header.jsx";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/forms/Login.jsx";
import Register from "./pages/forms/Register.jsx";
import PostsPages from "./pages/posts/PostsPages.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreatePost from "./pages/posts/CreatePost.jsx";
import Footer from "./components/footer/Footer.jsx";
import PostDetails from "./pages/posts/PostDetails.jsx";
import Category from "./components/categories/Category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UsersTable from "./pages/admin/UsersTable.jsx";
import PostsTable from "./pages/admin/PostTable.jsx";
import CateGoriesTable from "./pages/admin/CategoriesTable.jsx";
import CommentTable from "./pages/admin/CommentsTable.jsx";
import ForgotPassword from "./pages/forms/Forgotpassword.jsx";
import ResetPassword from "./pages/forms/ResetPassword.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verifyemail/VerifyEmail.jsx";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/api/auth/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to={`/`} />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/posts" element={<PostsPages />} />
        <Route
          path="/posts/create-post"
          element={user ? <CreatePost /> : <Navigate to={`/`} />}
        />
        <Route path="/post/details/:id" element={<PostDetails />} />
        <Route path="/posts/categories/:category" element={<Category />} />
        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/users-table"
          element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/posts-table"
          element={user?.isAdmin ? <PostsTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/categories-table"
          element={user?.isAdmin ? <CateGoriesTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/comments-table"
          element={user?.isAdmin ? <CommentTable /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
