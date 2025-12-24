import About from './pages/About';
import Consultation from './pages/Consultation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Consultation": Consultation,
    "Home": Home,
    "Dashboard": Dashboard,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};