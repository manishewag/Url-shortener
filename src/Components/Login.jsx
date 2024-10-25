/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
import {BeatLoader} from "react-spinners"
import Error from "./Error"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import UseFetch from "../hooks/UseFetch"
import { login } from "../../db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "../Context"

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const {data, error, loading, fn: fnLogin} = UseFetch(login, formData);
    const {fetchUser} = UrlState();

    useEffect (() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }

    }, [data, error])

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is Required"),
                password: Yup.string()
                  .min(6,"Password must be at least 6 characters")
                  .required("Password is Required"),
            });

            await schema.validate(formData, {abortEarly: false});
            // api call
            await fnLogin()
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    }

  return (
    <div>
        <h3 className="mt-3 text-start">Login</h3> 
            <p>toyour account if you already have one</p>
            {error && <Error message={error.message}/>}
            <div className='mb-3'>
              <input type='email' name="email" className='form-control mt-3 px-4' placeholder='Enter Email'
                 onChange={handleInputChange} />
              {errors.email && <Error message={errors.email}/>}
            </div>

            <div className='mb-3'>
              <input type='password' name="password" className='form-control' placeholder='Enter Password'
                 onChange={handleInputChange}  />
              {errors.password && <Error message={errors.password}/>}
            </div>

            <button className='btn btn-danger form-control mb-3' onClick={handleLogin}>
                {loading ? <BeatLoader size={10} color="#36d7b7"/>: "Login"}   
            </button>
    </div>
  )
}

export default Login