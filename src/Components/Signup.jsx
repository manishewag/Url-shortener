/* eslint-disable react-hooks/exhaustive-deps */
import {BeatLoader} from "react-spinners"
import Error from "./Error"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import UseFetch from "../hooks/UseFetch"
import { signup } from "../db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "../Context"

const Signup = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null,
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    }

    const {data, error, loading, fn: fnSignup} = UseFetch(signup, formData);
    const {fetchUser} = UrlState();

    useEffect (() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }

    }, [error, loading]);

    const handleSignup = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
                  .required("Name is Required"),
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is Required"),
                password: Yup.string()
                  .min(6,"Password must be at least 6 characters")
                  .required("Password is Required"),
                profile_pic: Yup.mixed()
                  .required("Profile picture is Required"),
            });

            await schema.validate(formData, {abortEarly: false});
            // api call
            await fnSignup();
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
        <h3 className="mt-3 text-start">Singup</h3> 
            <p>Create a new account if you haven&rsquo;t already </p>
            {error && <Error message={error.message}/>}

            <div className='mb-3'>
              <input type='text' name="name" className='form-control mt-3 px-4' placeholder='Enter Name'
                 onChange={handleInputChange} />
              {errors.name && <Error message={errors.name}/>}
            </div>

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

            <div className='mb-3'>
              <input type='file' name="profile_pic" className='form-control' accept="image/*"
                 onChange={handleInputChange}  />
              {errors.profile_pic && <Error message={errors.profile_pic}/>}
            </div>

            <button className='btn btn-danger form-control mb-3' onClick={handleSignup}>
                {loading ? (
                  <BeatLoader size={10} color="#36d7b7"/>
                ) : ( 
                  "Create Account"
                )}   
            </button>
    </div>
  )
}

export default Signup