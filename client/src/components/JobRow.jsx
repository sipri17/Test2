import { useNavigate } from "react-router-dom"

export default function JobRow({ job }) {
    const navigate = useNavigate()

    return (


        <a onClick={() => navigate(`/${job.id}`)}>
            <div className="d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm">
                {/* Basic Plan */}
                <div className="row align-items-center">
                    <div className="col-12 col-md-4">
                        <h4 className="pt-3 text-170 text-600 text-primary letter-spacing">
                            {job.title}
                        </h4>
                        <div className="text-black-50 text-120">
                            <span className="text-success">{job.type}</span>
                        </div>
                    </div>
                    <ul className="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                        <li>
                            {/* <i className="fa fa-check text-success-m2 text-110 mr-2 mt-1" /> */}
                            <span>
                                {/* <span className="text-110">Donec id elit.</span> */}
                                {/* Fusce dapibus... */}
                                <span className="text-muted">{job.company}</span>
                            </span>
                        </li>

                    </ul>
                    <div className="col-12 col-md-4 text-center">
                        <h4 className="pt-2 text-170 text-600 text-dark letter-spacing fs-5">
                            {job.location}
                        </h4>
                        <h4 className="pt-3 text-170 text-600 text-muted letter-spacing fs-5">
                            {job.dateRange}
                        </h4>
                        {/* <a href="#" className="f-n-hover btn btn-info btn-raised px-4 py-25 w-75 text-600">Get Started</a> */}
                    </div>
                </div>
            </div>
        </a>
    )
}