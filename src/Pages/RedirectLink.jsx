import UseFetch from "../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { getLongUrl } from "../db/apiUrls";
import { storeClicks } from "../db/apiClicks";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();

  const {loading, data, fn} = UseFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = UseFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
    // short_url: data?.short_url,
  });

  useEffect(() => {
    fn()
}, [])

useEffect(() => {
  if (!loading && data) {
    fnStats();
  }
}, [loading]);

if (loading || loadingStats) {
  return (
    <>
       <BarLoader width={"100%"} color="#36d7b7" />
       <br/>
       Redirecting...
    </>   
  )
}


 
}

export default RedirectLink