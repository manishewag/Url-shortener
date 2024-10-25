import { Link, useNavigate } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import { UrlState } from "../Context";
import UseFetch from "../hooks/UseFetch";
import { logout } from "../db/apiAuth";
import { BarLoader } from "react-spinners";


const Header = () => {

    const navigate = useNavigate();
    
    const { user, fetchUser} = UrlState();

    const {loading, fn: fnLogout} = UseFetch(logout);

    return (
        <>
        <div className=" d-flex p-4 bg-secondary text-white justify-content-between">
            <Link to="/" className="px-5 fs-5 text-decoration-none text-white">URL</Link>
            <div>
                {!user ?
                    <button className="px-3" onClick={() => navigate("/auth")}>Login</button>
                    : (
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg> 
                                    <span className="px-2">{user?.user_metadata?.name}</span>

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                
                                <Dropdown.Item href="#/action-2">
                                  <Link to="/dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-link-45deg gap-2" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                                    </svg>
                                    <span className="px-2">My Links</span>
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" className="gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right gap-2" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                    <span className="px-2"
                                    onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/")
                                        })
                                    }}
                                    >
                                        Logout</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }

            </div>
        </div>
        {loading && <BarLoader className="mb-3" width={"100%"} color='#36d7b7'/>}
     </>
    )
}

export default Header