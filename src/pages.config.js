import About from './pages/About';
import Consultation from './pages/Consultation';
import Dashboard from './pages/Dashboard';
import DataSources from './pages/DataSources';
import ExternalIntegrations from './pages/ExternalIntegrations';
import GovernancePanel from './pages/GovernancePanel';
import Home from './pages/Home';
import Profile from './pages/Profile';
import KnowledgeBase from './pages/KnowledgeBase';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Consultation": Consultation,
    "Dashboard": Dashboard,
    "DataSources": DataSources,
    "ExternalIntegrations": ExternalIntegrations,
    "GovernancePanel": GovernancePanel,
    "Home": Home,
    "Profile": Profile,
    "KnowledgeBase": KnowledgeBase,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};