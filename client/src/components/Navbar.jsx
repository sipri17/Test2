import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()



    function logOut() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>

            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" >GitHub Jobs</Link>

                    <div id="navbarSupportedContent" className='d-flex justify-content-between '>

                    <Link to='/infinityScroll' className="navbar-brand fs-6" >infinity mode</Link>



                        <button className="d-flex btn btn-danger mx-2" onClick={logOut} >Log Out
                        </button>
                    </div>
                </div>
            </nav>






        </>
    )
}