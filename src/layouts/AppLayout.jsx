import { Outlet } from "react-router-dom"

import Header from "../Components/Header"

const AppLayout = () => {
  return (
    <div>
        <main className="">
            <Header/>
            <Outlet/>
        </main>

    </div>
  )
}

export default AppLayout