import { useEffect, useState } from 'react'
import baseUrl from '../utilities/baseUrl'
import Swal from 'sweetalert2'
import JobRow from '../components/JobRow'

export default function JobList() {

    let [jobs, setJobs] = useState([])
    let [input, setInput] = useState({})
    const [currentPage, setCurrentPage] = useState(1);

    const fetchJobs = async () => {
        try {
            const description = input.description ? input.description : ""
            const location = input.location ? input.location : ""
            const res = await fetch(`${baseUrl}/jobs?description=${description}&location=${location}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                },
            })
            const data = await res.json()
            setJobs(data)
            console.log(data, '<<data');



        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    function submitHandler(e) {
        e.preventDefault()
        fetchJobs()
    }

    function onChangeHandler(e) {
        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const obj = { ...input, [name]: value }
        setInput(obj)
        console.log(obj);

    }

    function onChangeFullTimeInput(e) {
        let obj = { ...input, ['full_time']: !input.full_time }
        setInput(obj)
        // setSelectedOption(!selectedOption)
        console.log(e.target);

    }



    const currentData = jobs.slice((currentPage - 1) * 8, currentPage * 8);


    useEffect(() => {
        fetchJobs()
    }, [currentPage])


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <>

            <div className="flex text-center my-2 justify-content-between">
                <div className="row " style={{ marginRight: '50px', marginLeft: '50px' }}>
                    <form className="d-flex " onSubmit={submitHandler} >
                        <div className='mx-2 w-50 '>
                            <label htmlFor="description">Job description</label>
                            <input className="form-control " onChange={onChangeHandler} type="text" name="description" placeholder="Filter by title, benefits, companies, expertise" />
                            {/* <input  type="search" placeholder="Search" aria-label="Search" /> */}
                        </div>
                        <div className='mx-2 w-50 '>
                            <label htmlFor="location">Location</label>
                            <input className="form-control " onChange={onChangeHandler} type="text" name="location" placeholder="Filter by city, state, zip code, or country" />
                            {/* <input  type="search" placeholder="Search" aria-label="Search" /> */}
                        </div>
                        <label >
                            Full Time Only
                            <input
                                type="checkbox"
                                name='full_time'
                                value='true'
                                checked={input.full_time}
                                onChange={onChangeHandler}
                                className='mx-3 '
                            />
                        </label>

                        <button className="btn btn-outline-dark" style={{ height: '50px' }} type="submit">Search</button>

                    </form>

                </div>
            </div>
            <div className="d-style text-center border-2 bgc-white   w-100 my-2 py-3 shadow-sm mt-5">
                <h2>Job List</h2>

                <div className="login-root">
                    <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>

                        <div className="box-root  flex-flex flex-direction--column" >

                            <div>
                                <div className="container">
                                    <div className="">
                                        {currentData?.map((job, index) => {
                                            return <JobRow key={index} job={job} ></JobRow>
                                        })}
                                    </div>
                                    <div >
                                        {Array.from({ length: Math.ceil(jobs.length / 8) }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handlePageChange(i + 1)}
                                                className="btn btn-primary mx-2"
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>


                                    {/* <button onClick={updateJobs} className="f-n-hover btn btn-info btn-raised px-4 py-25 w-100 text-600">More Jobs</button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}