import { createBrowserRouter, redirect } from "react-router-dom";
import Root from '../views/Root'
import Login from '../views/Login'
import JobList from "../views/JobList";
import JobDetail from "../views/JobDetail";
import NotFound404 from "../views/NotFound404" 
import JobListInfinityScroll from "../views/JobListInfinityScroll";



const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(loggedIn){
                return redirect('/')
            }
            return loggedIn
        }
    }, 
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <JobList />
            },
            {
                path: "/infinityScroll",
                element: <JobListInfinityScroll />
            },
            {
                path: "/:id",
                element: <JobDetail />
            },
            {
                path: "*",
                element: <NotFound404 />
            },
           
        ],
        loader : ()=>{
            const loggedIn = localStorage.getItem('access_token')
            if(!loggedIn){
                return redirect('/login')
            }
            return loggedIn
        }
    }
]);

export default router