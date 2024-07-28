
const AdminTable = ({event}:any) => {
    return (
        <table className="striped-table">
            <thead>
            <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Tag</th>
                <th colSpan={2} className="text-center">
                Actions
                </th>
            </tr>
            </thead>
        
        <tbody>
          {event.length > 0 ? (
            event.map((event:any) => (
              <tr key={event.id}>
                {/*<td>{i + 1}</td>*/}
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.tag} </td>
                <td className="text-right">
                  <button
                    //onClick={() => handleEdit(event.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    //onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    )
}

export default AdminTable;