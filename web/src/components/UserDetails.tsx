import { useUsersContext } from "../Hooks/UseUsersContext";
import { useEffect, useState } from "react";

// Not sure if this should be in the file?
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dOB: string;
  gender: string;
  year: string;
  dietary: string;
  license: string;
  accessibility: string;
  emFirstName: string;
  emLastName: string;
  emMobile: string;
  emRelationship: string;
  events: string[];
}

const UserDetails = ({ user }: { user: User }) => {
  // Local state
  const [details, setDetails] = useState<User>({ ...user });
  const [eventData, setEventData] = useState<any[]>([])

  const [isEditMode, setIsEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // dispatch function to update global state
  const { dispatch } = useUsersContext();

  useEffect(() => {
    const fetchEventData = async (eventId: string) => {
      try {
        const response = await fetch(`http://localhost:3000/api/${eventId}`)
        const data = await response.json();
        return data;
      } catch (err) {
        console.error("Failed", err)
        return null;
      }
    };

    const fetchAllEvents = async () => {
      const eventsDataPromises = user.events.map(eventId => fetchEventData(eventId));
      const eventsData = await Promise.all(eventsDataPromises);
      setEventData(eventsData.filter(event => event !== null));
    };

    fetchAllEvents();
  }, [user.events])

  const handleClickDelete = async () => {
    const confirmDelete = window.confirm('Are you sure want to remove ' + user.firstName + '?')

    if (confirmDelete) {
      const response = await fetch('http://localhost:3000/api/removeUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id })
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'DELETE_USER', payload: json })
      }
    }
  }

  const enableEditMode = () => {
    setIsEditMode(true);
    setShowDetails(true);
  }

  const disableEditMode = () => {
    setIsEditMode(false);
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleSave = async () => {
    const response = await fetch('http://localhost:3000/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...details})
    })

    if (response.ok) {
      setDetails({...details})
    }

    disableEditMode();
  }

  // Uses original state to revert back to old values
  const handleCancel = () => {
    setDetails({ ...user })

    disableEditMode();
  }

  //User Details component
  return (
    <div className="">
      {isEditMode ? (
        <div className="">
          {/* Main info edit mode */}
          <div className="flex border border-gray-600 justify-between items-center h-10 px-2 rounded gap-2">
            <div className="flex flex-[0_0_79%]">
              <div className="flex-[1] m-0">
                <input type="text" className="w-full" value={details.firstName}
                  onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, firstName: e.target.value }))}
                />
              </div>
              <div className="flex-[1] m-0">
                <input type="text" className="w-full" value={details.lastName}
                  onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, lastName: e.target.value }))}
                />
              </div>
              <div className="flex-[2] m-0">
                <input type="text" className="w-full" value={details.email}
                  onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, email: e.target.value }))}
                />
              </div>
              <div className="flex-[1] m-0">
                <input type="text" className="w-full" value={details.mobile}
                  onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, mobile: e.target.value }))}
                />
              </div>
              <div className="flex-[1] m-0">
                <input type="text" className="w-full" value={details.dOB}
                  onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, dOB: e.target.value }))}
                />
              </div>
              <div className="flex flex-[1]">
                <select className="w-full" id="" value={details.gender} onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, gender: e.target.value }))}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end flex-[0_0_21%] gap-2">
              <span onClick={handleCancel} className="hover:cursor-pointer border border-gray-400 px-2 rounded">Cancel</span>
              <span onClick={handleSave} className="hover:cursor-pointer rounded px-2 text-green-600 border border-green-600">Save</span>
            </div>
          </div>

          {/* Details Panel Edit Mode */}
          {showDetails ? (
            <div className="">
              <div className="flex p-2 border border-black border-t-0 rounded">
                <div className="flex-col flex-[1]">
                  <div className="flex flex-nowrap">

                    <div className="flex w-[50%]">
                      <div className="flex-auto text-center">Year Level:</div>
                      <select className="flex-auto mr-4" id="" value={details.year} onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, year: e.target.value }))}>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Post-graduate">Post-graduate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex w-[50%]">
                      <div className="flex-auto text-center">License:</div>
                      <select className="flex-auto mr-4" id="" value={details.license} onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, license: e.target.value }))}>
                        <option value="Full">Full</option>
                        <option value="Restricted">Restricted</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                  </div>

                  <div className="flex">
                    <div className="flex-[1]">
                      <div className="underline">Dietary Requirements</div>
                      <input type="text" className="" value={details.dietary}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, dietary: e.target.value }))}
                      />
                    </div>

                    <div className="flex-[1]">
                      <div className="underline">Accessibility Requirements</div>
                      <input type="text" className="" value={details.accessibility}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, accessibility: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-[1]">
                  <div className="underline">Emergency Contact</div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex gap-2 w-[49%]">
                      <div className="flex-shrink-0">First Name: </div>
                      <input type="text" className="w-full" value={details.emFirstName}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, emFirstName: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2 w-[49%]">
                      <div className="flex-shrink-0">Last Name: </div>
                      <input type="text" className="w-full" value={details.emLastName}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, emLastName: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2 w-[49%]">
                      <div className="">Mobile: </div>
                      <input type="text" className="w-full" value={details.emMobile}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, emMobile: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2 w-[49%]">
                      <div className="">Relationship: </div>
                      <input type="text" className="w-full" value={details.emRelationship}
                        onChange={(e) => setDetails((oldDetails) => ({ ...oldDetails, emRelationship: e.target.value }))}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

      ) : (
        <div className="">
          {/* Main info display mode */}
          <div className="flex border border-gray-600 justify-between items-center h-10 px-2 rounded gap-2">
            <div className="flex flex-[0_0_79%]">
              <div className="flex-[1] m-0">{details.firstName}</div>
              <div className="flex-[1] m-0">{details.lastName}</div>
              <div className="flex-[2] m-0">{details.email}</div>
              <div className="flex-[1] m-0">{details.mobile}</div>
              <div className="flex-[1] m-0">{details.dOB}</div>
              <div className="flex-[1] m-0r">{details.gender}</div>
            </div>

            <div className="flex justify-end flex-[0_0_21%] gap-2">
              <span onClick={toggleShowDetails} className="hover:cursor-pointer border border-gray-400 px-2 rounded">{showDetails ? "Hide Details" : "Show Details"}</span>
              <span onClick={enableEditMode} className="hover:cursor-pointer border border-gray-400 px-2 rounded">Edit</span>
              <span onClick={handleClickDelete} className="hover:cursor-pointer rounded px-2 text-red-600 border border-red-600">Delete</span>
            </div>
          </div>

          {/* Details panel display mode */}
          {showDetails ? (
            <div className="flex p-2 border border-black border-t-0 rounded flex-wrap">
              <div className="flex-col flex-[2]">
                <div className="flex justify-evenly">
                  <div className="">Year Level: {details.year}</div>
                  <div className="">Driver's License: {details.license}</div>
                </div>
                <div className="flex">
                  <div className="flex-[1]">
                    <div className="underline">Dietary Requirements</div>
                    <div className="">{details.dietary}</div>
                  </div>
                  <div className="flex-[1]">
                    <div className="underline">Accessibility Requirements</div>
                    <div className="">{details.accessibility}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-[1]">
                <div className="underline">Emergency Contact</div>
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <div className="">Name: {details.emFirstName} {details.emLastName}</div>
                  </div>
                  <div className="">Mobile: {details.emMobile}</div>
                  <div className="">Relationship: {details.emRelationship}</div>
                </div>
              </div>

              <div className="flex-[1]">
                <div className="underline">Events Attending</div>
                {eventData.map((event, index) => (
                  <div key={index}>
                    <div className="">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDetails