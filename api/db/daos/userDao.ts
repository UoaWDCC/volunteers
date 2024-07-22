// copied from https://github.com/UoaWDCC/VPS/blob/master/backend/src/db/daos/staffDao.js

import User from '../models/user';

/**
 * Retrieves all the authorised staff stored in the database
 * @param fid = firebase user id
 * @returns list of database authorise staff objects
 */
const retrieveAuthorisedStaffList = async (fid: string) => {
  return User.find({ firebaseID: fid });
};

export default retrieveAuthorisedStaffList;
