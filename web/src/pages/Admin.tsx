import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex flex-col justify-center my-4 text-2xl mt-[5em] font-semibold text-primary text-center">
      <div>
        <h1>University of Auckland Volunteers Club</h1>
        <h1>Admin Page</h1>
      </div>
      <div className="mt-[3em]">
        <Link to='/admin/users'>All users</Link>
        <Link className="ml-[5em]" to='/admin/events'>All events</Link>
      </div>
    </div>
  )
}