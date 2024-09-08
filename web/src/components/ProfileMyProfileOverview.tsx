import React, { useState } from 'react';

const ProfileMyProfileOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe123@gmail.com',
    mobile: '123 456 7890',
    upi: 'jdoe123',
    dob: '2003-10-12',
    gender: 'Male',
    yearLevel: '3rd Year',
    dietary: 'Vegan',
    license: 'Full',
    emergencyFirstName: 'Mary',
    emergencyLastName: 'Doe',
    relationship: 'Mother',
    emergencyMobile: '234 567 8901',
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit form data here
  };

  return (
    <div className="dashboard p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between mb-6">
        <h2 className="dashboard text-heading2 text-primary">Profile Overview</h2>
        <button className="text-primary underline" onClick={toggleEdit}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="mb-8">
          <h3 className="dashboard text-heading3 mb-4">Personal Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="dashboard text-detail-regular">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">UPI</label>
              <input
                type="text"
                name="upi"
                value={profile.upi}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Preferred Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Gender</label>
              <input
                type="text"
                name="gender"
                value={profile.gender}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mb-8">
          <h3 className="dashboard text-heading3 mb-4">Additional Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="dashboard text-detail-regular">Year Level</label>
              <input
                type="text"
                name="yearLevel"
                value={profile.yearLevel}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Dietary Requirements</label>
              <input
                type="text"
                name="dietary"
                value={profile.dietary}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Driver's License</label>
              <input
                type="text"
                name="license"
                value={profile.license}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Details Section */}
        <div>
          <h3 className="dashboard text-heading3 mb-4">Emergency Contact Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="dashboard text-detail-regular">First Name</label>
              <input
                type="text"
                name="emergencyFirstName"
                value={profile.emergencyFirstName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Last Name</label>
              <input
                type="text"
                name="emergencyLastName"
                value={profile.emergencyLastName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Relationship</label>
              <input
                type="text"
                name="relationship"
                value={profile.relationship}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="dashboard text-detail-regular">Mobile Number</label>
              <input
                type="tel"
                name="emergencyMobile"
                value={profile.emergencyMobile}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`border-none p-0 text-body ${
                  isEditing ? 'bg-white' : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        {isEditing && (
          <div className="mt-4 flex justify-end">
            <button className="text-white bg-primary-dark px-4 py-2 rounded-md" type="submit">
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileMyProfileOverview;
