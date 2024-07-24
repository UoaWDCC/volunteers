// copied from https://github.com/UoaWDCC/VPS/blob/master/frontend/src/hooks/crudHooks.jsx

import axios from 'axios';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import AuthenticationContext from '../src/context/AuthenticationContext';

/**
 * This function is a modified version of the above useGet function.
 * A simpler version with no auth or loading checking.
 * @param {*} url
 * @param {*} setData
 */

/**
 * this function filters network request errors (to the ones we care about)
 *
 * @param {object} error - contains error message + error response
 * @returns {boolean}
 */
function isRealError(error: { response: { status: number } }) {
  //!!REPLACED BY VSCODE PARAMETER TYPES [error] INFERERED!!
  return !error.response || error.response.status === 404 || error.response.status === 409 || error.response.status === 401;
}

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 * Code adapted from SOFTENG750 lab4 https://gitlab.com/cs732-s1c/cs732-labs/cs732-lab-04/-/blob/master/frontend/src/hooks/useGet.js
 */

//!!REPLACED BY VSCODE PARAMETER TYPES [url] INFERERED!!
export function useGet(url: string, setData: (arg0: any) => void, requireAuth = true) {
  const [isLoading, setLoading] = useState(false);
  const [version, setVersion] = useState(0);
  // const { getUserIdToken } = useContext(AuthenticationContext);
  const { getUserIdToken } = useContext(AuthenticationContext) as unknown as { getUserIdToken: () => Promise<string> }; //!!REPLACED BY GITHUB COPILOT, NO IDEA WHAT THIS DOES!!

  function reFetch() {
    setVersion(version + 1);
  }

  useEffect(() => {
    async function fetchData() {
      let hasError = false;
      setLoading(true);

      let config = {};
      let token = null;
      if (requireAuth) {
        token = await getUserIdToken();
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }

      const response = await axios.get(url, config).catch((err) => {
        hasError = isRealError(err);
      });

      if (!hasError && response) {
        setData(response.data);
      }

      setLoading(false);
    }
    fetchData();
  }, [url, version]);

  return { isLoading, reFetch };
}

//!!REPLACED BY VSCODE PARAMETER TYPES INFERERED!!
export function useGetSimplified(url: string, setData: { (value: SetStateAction<undefined>): void; (arg0: any): void }) {
  useEffect(() => {
    async function fetchData() {
      let hasError = false;

      const response = await axios.get(url).catch((err) => {
        hasError = isRealError(err);
      });

      if (!hasError && response) {
        setData(response.data);
      }
    }
    fetchData();
  }, [url]);
}