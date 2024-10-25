/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from "../Components/Signup";
import Login from "../Components/Login";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>
        { longLink
          ? "Let's go to login first.."
          : "Login / Signup"}
      </h1>

      <div className="d-grid mt-5 justify-content-center align-items-center">
        <Tabs
          defaultActiveKey="Login"
          id="uncontrolled-tab-example"
          className="border rounded mb-3"
          fill>

          <Tab eventKey="Login" title="Login" className="px-5 border">
            <Login/>
          </Tab>

          <Tab eventKey="Signup" title="Signup" className="px-5 border">
            <Signup/>
          </Tab>
          
        </Tabs>
      </div>

    </div>
  )
}

export default Auth