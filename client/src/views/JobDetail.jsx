import baseUrl from '../utilities/baseUrl'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function JobDetail() {
    const { id } = useParams()

    const [job, setJob] = useState()


    const fetchJob = async () => {
        try {

            const res = await fetch(`${baseUrl}/jobs/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                },
            })
            const data = await res.json()
            setJob(data)
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

    useEffect(() => {
        fetchJob()
    }, [])

    return (
        <div className="container ">
            <h1 className="text-center my-3" >{job?.title}</h1>
                <div >
                    <h5>{job?.type}/{job?.location}</h5>                
                </div>
            <div className="d-flex" style={{ marginTop: '5rem' }}>
                <div className='d-flex'>
                    <div className=" w-75">
                        <div dangerouslySetInnerHTML={{ __html: job?.description }} />
                    </div>
                    <div>
                        <div className="card" style={{ width: '15rem', marginLeft: '5rem' }}>
                            <img src={job?.company_logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{job?.company}</h5>
                                 <div dangerouslySetInnerHTML={{ __html: job?.how_to_apply }} /> 
                                <a href={job?.company_url} className=" mx-2">Company Url</a>
                                <a href={job?.url} className=" mx-2">Job Link </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div style={{ marginTop: "10rem" }}>
                <div className="d-flex justify-content-center">
                    <h1 style={{ color: "white", marginBottom: "40px" }} >Trailer</h1>
                </div>

            </div>
        </div>
    )
}