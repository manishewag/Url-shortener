/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners"
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { Filter } from "lucide-react"
import { UrlState } from "../Context";
import UseFetch from "../hooks/UseFetch";
import Error from "../Components/Error";
import { getUrls } from "../../db/apiUrls";
import { getClicksForUrls } from "../../db/apiClicks";
import LinkCard from "../Components/LinkCard";
import CreateLink from "../Components/CreateLink";


const Dashboard = () => {

  const [searchQuery, setSearchQuery] = useState("");

    const {user} = UrlState();
    const {loading, error, data: urls, fn: fnUrls} = UseFetch(getUrls, user?.id);
    const {
      loading: loadingClicks,
      data: clicks,
      fn: fnClicks,
    } = UseFetch(
      getClicksForUrls,
      urls?.map((url) => url.id)
    )

    useEffect(() => {
      fnUrls()
    },[]);

    useEffect(() => {
      if (urls?.length) fnClicks();
    },[urls?.length]);

    const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
     <div className="p-4 bg-secondary mt-4">
    {(loading || loadingClicks) && (
      <BarLoader width={"100%"} color='#36d7b7' />
    )}
    <div className="d-flex row-cols-2 gap-4">
      <Card style={{ width: '40rem', height:'5rem'}}>
        <Card.Body>
          <Card.Title>Links Created</Card.Title>
          <Card.Text>
            <p>{urls?.length}</p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '41rem', height:'5rem' }}>
        <Card.Body>
          <Card.Title>Total Clicks</Card.Title>
          <Card.Text>
            <p>{clicks?.length}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <div className="d-flex justify-content-between mt-4">
      <h1 className=" fs-4 fw-bold text-white">My Links</h1>
      <CreateLink/>
      {/* <button className="rounded">Create Link</button> */}
    </div>

    <div className="mt-3 d-flex position-relative">
      <input type="text"
        placeholder="Filter Links..."
        className="form-control"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Filter className="position-absolute end-0 translate-middle-x mt-2"/>
    </div>
    {error && <Error message={error?.message}/>}
    {(filteredUrls || []).map((url, i) => {
      return <LinkCard key={i} url={url} fetchUrls={fnUrls}/>
    })}
  </div>
  )
}

export default Dashboard