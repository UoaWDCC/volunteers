import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex justify-center my-4">
      <Link to='/admin/users'>All users</Link>
    </div>
  )
}