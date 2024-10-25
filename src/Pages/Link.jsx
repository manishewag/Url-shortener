import { useNavigate, useParams } from "react-router-dom";
import { UrlState } from "../Context";
import UseFetch from "../hooks/UseFetch";
import { getClicksForUrl } from "../db/apiClicks";
import { deleteUrl, getUrl } from "../db/apiUrls";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { LinkIcon } from "lucide-react";
import { Copy, Download, Trash } from "lucide-react"
import Button from 'react-bootstrap/Button';
import { BeatLoader } from "react-spinners"
import Card from 'react-bootstrap/Card'
import LocationStats from "../Components/LocationStats";
import DeviceStats from "../Components/DeviceStats";

const Link = () => {

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

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const { loading, data: url, fn, error } = UseFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = UseFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = UseFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }


  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="d-flex flex-col gap-5 sm:flex-row justify-content-between mt-3 bg-secondary p-5">
        <div className="d-grid gap-3">
          <span className="fw-bold fs-1 text-white">{url?.title}</span>
          <a href={`https://localhost:5173/${link}`} className="fw-semibold fs-4 text-decoration-none" target="_blank">
            https://{link}
          </a>
          <a href={url?.original_url} className="text-decoration-none text-white" target="_blank">
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="opacity-50 text-white">{new Date(url?.created_at).toLocaleString()}</span>
          <div className="d-flex px-4 mt-2 gap-3">

            <Button variant="light"
              className="bg-secondary text-white"
              onClick={() => navigator.clipboard.writeText(`https://${url?.short_url}`)}>
              <Copy />
            </Button>

            <Button variant="light"
              className="bg-secondary text-white"
              onClick={downloadImage}>
              <Download />
            </Button>

            <Button variant="light"
              className="bg-secondary text-white"
              onClick={() => fnDelete()}>
              {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <img src={url?.qr} alt="qr code" className="col-5 bg-white" />
        </div>

        <Card style={{ width: '98rem' }} className="bg-secondary border-white">
          <Card.Body className="text-white">
          <Card.Title className="px-2 fw-bold fs-4">Stats</Card.Title>
            {stats && stats?.length ? (
              <Card.Text className="mb-2">
                  <Card.Body className="border rounded p-1">
                  <Card.Title className="px-2">Total Clicks</Card.Title>
                  <Card.Text>
                  <p className="px-2">{stats?.length}</p>
                  </Card.Text>
                  </Card.Body>
                  <Card.Title className="px-2 mt-2">Location Data</Card.Title>
                  <LocationStats stats={stats}/>
                  <Card.Title className="px-2">Device Info</Card.Title>
                  <DeviceStats stats={stats}/>
              </Card.Text>
            ) : (
              <Card.Text className="mb-2 ">
                {loadingStats === false
                  ? "No Statistics yet"
                  : "Loading Statistics"}
              </Card.Text>
            )}
          </Card.Body>
        </Card>

      </div>
    </>
  )
}

export default Link