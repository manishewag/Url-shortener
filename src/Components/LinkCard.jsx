/* eslint-disable react/prop-types */
import { Copy, Download, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import UseFetch from "../hooks/UseFetch";
import { deleteUrl } from "../../db/apiUrls";
import { BeatLoader } from "react-spinners"
const LinkCard = ({ url, fetchUrls}) => {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    };

    const {loading: loadingDelete, fn: fnDelete} = UseFetch(deleteUrl, url?.id);


  return (
    <div className=" mt-4 bg-secondary-subtle rounded d-flex flex-col border">
        <div  className="col-1">
        <img className="rounded w-100 h-100 " src={url?.qr} alt="qr code" />
        </div>
        <Link to={`/link/${url?.id}`} className="row text-decoration-none">
            <span className="fs-4 fw-bold text-black">{url?.title}</span>
            <span className="fs-4 fw-semibold">https://{url?.custom_url ? url?.custom_url : url.short_url}</span>
            <span className="text-black">{url?.original_url}</span>
            <span className="mb-2 text-black">{new Date(url?.created_at).toLocaleString()}</span>
        </Link>
        <div className="flex px-4 mt-2 ">

            <Button variant="light" 
               className="bg-secondary-subtle"
               onClick={() => navigator.clipboard.writeText(`https://${url?.short_url}`)}>
                         <Copy/>
            </Button>

            <Button variant="light" 
               className="bg-secondary-subtle"
               onClick={downloadImage}>
                        <Download/>
            </Button>

            <Button variant="light" 
               className="bg-secondary-subtle"
               onClick={() =>fnDelete().then(()=>fetchUrls())}>
               {loadingDelete ? <BeatLoader size={5} color="white"/> : <Trash/>}
            </Button>
        </div>
    </div>
  )
}

export default LinkCard