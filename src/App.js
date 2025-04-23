import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Auth from './pages/Auth';
import MainContent from './pages/MainContent';
import { Grid, Box } from "@mui/material";
import Sidebar from './components/Sidebar/Sidebar';
import Breadcrum from './components/Breadcrum/Breadcrum';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';



const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");
  return token ? element : <Navigate to="/" replace />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastPath = pathSegments[0];
  const token = sessionStorage.getItem("token");

  if (!token && location.pathname === "/") {
    return <>{children}</>;
  }

  let showSideBar = true;
  let showBreadcrum = true;

  switch (lastPath) {
    case "home":
      showSideBar = false;
      showBreadcrum = false;
      break;
    case "details":
      showSideBar = false;
      showBreadcrum = false;
      break;
    default:
      showSideBar = true;
      showBreadcrum = true;
      break;
  }

  return (
    <Box sx={{ height: "100%", backgroundColor: '#F8F8F9' }}>
      <Grid item >
        <Header />
        {showBreadcrum && (
          <Breadcrum page={lastPath} />
        )}
      </Grid>
      <Grid container direction="row">
        <Grid item >
          {showSideBar && <Sidebar />}
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          {children}
        </Grid>
      </Grid>
      <Footer/>
    </Box>
  );
};


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
        <Routes>

          <Route path='/' element={<Auth />} />
          <Route path='/register' element={<Auth register="register" />} />

          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="Home" />}
                      />
                    }
                  />
                  <Route
                    path="/details/:id"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="Details" />}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="Profile" />}
                      />
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="Account" />}
                      />
                    }
                  />
                  <Route
                    path="/list"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="List" />}
                      />
                    }
                  />
                  <Route
                    path="/post"
                    element={
                      <ProtectedRoute
                        element={<MainContent page="Post" />}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
