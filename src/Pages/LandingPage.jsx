import { useState } from "react"
import Button from "react-bootstrap/esm/Button"
import { useNavigate } from "react-router-dom";


const LandingPage = () => {

  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (event) => {
    event.preventDefault();
    if (longUrl)
       navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="p-4 bg-secondary text-center mt-4">
      <h1 className="fw-bold text-white">THE ONLY URL SHORTENER</h1>
      <form onClick={handleShorten} className="mt-4 text-center " >
        <input 
            type="url" 
            placeholder="Enter your long url"
            className="w-50 rounded p-2"
            value={longUrl}
            onChange={ event => setLongUrl(event.target.value)}/>
          <br/>
        <Button className="primary gap-2 mt-4 rounded px-4">Shorten !</Button> 
      </form> 
        <img src="/url.jpeg" alt=""  className="w-100 mt-5 opacity-75"/>
    </div>
  )
}

export default LandingPage

