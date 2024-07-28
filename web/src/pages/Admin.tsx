import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex justify-center my-4 text-2xl mt-[5em] font-semibold">
      <Link to='/admin/users'>All users</Link>
      <Link className="ml-[5em]" to='/admin/events'>All events</Link>
    </div>
  )
}