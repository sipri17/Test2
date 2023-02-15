import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../utilities/baseUrl'
import Swal from 'sweetalert2'

export default function Login() {


    let [input, setInput] = useState({
        username: "",
        password: ""
    })

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (input) => {
        try {
            const res = await fetch(`${baseUrl}/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })

            const data = await res.json()

            if (!res.ok) {
                throw data
            }

            localStorage.setItem('access_token', data.access_token)

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    function submitHandler(e) {
        e.preventDefault()
        loginHandler(input)
            .then(() => {
                navigate('/')
            })
    }

    function onChangeHandler(e) {
        const { name, value } = e.target
        const obj = { ...input, [name]: value }
        setInput(obj)
        console.log(obj);
    }


    return (
        <>
            <div>


                <div className="login-root">
                    <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>

                        <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                            </div>
                            <div className="formbg-outer">
                                <div className="formbg">
                                    <div className="formbg-inner padding-horizontal--48">
                                        <span className="padding-bottom--15">Sign in to your account</span>
                                        <form id="stripe-login" onSubmit={submitHandler}>
                                            <div className="field padding-bottom--24">
                                                <label htmlFor="username">Username</label>
                                                <input onChange={onChangeHandler} type="text" name="username" />
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                                <input onChange={onChangeHandler} type="password" name="password" />
                                            </div>
                                            <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                                {/* <label htmlFor="checkbox">
                                                    <input type="checkbox" name="checkbox" /> Stay signed in for a week
                                                </label> */}
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <input type="submit" name="submit" defaultValue="Continue" />
                                            </div>
                                            <div className="field">
                                                {/* <a className="ssolink">Use single sign-on (Google) instead</a> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="footer-link padding-top--24">
                                    {/* <span>Don't have an account? <a >Sign up</a></span> */}
                                    <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                        <span><a >© Sipri</a></span>
                                        <span><a >Contact</a></span>
                                        <span><a >Privacy &amp; terms</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>








        </>

    )
}