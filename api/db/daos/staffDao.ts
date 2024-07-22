// copied from https://github.com/UoaWDCC/VPS/blob/master/backend/src/db/daos/staffDao.js

import Staff from '../models/staff';

/**
 * Retrieves all the authorised staff stored in the database
 * @param fid = firebase user id
 * @returns list of database authorise staff objects
 */
const retrieveAuthorisedStaffList = async (fid: string) => {
  return Staff.find({ firebaseID: fid });
};

export default retrieveAuthorisedStaffList;
