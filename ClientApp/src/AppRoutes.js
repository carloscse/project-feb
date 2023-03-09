import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/projects',
        requireAuth: true,
        element: <Projects />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
