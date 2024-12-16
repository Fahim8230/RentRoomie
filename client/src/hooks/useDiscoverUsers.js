import { useState, useEffect } from 'react';
import {apiURL } from "../utils/utils";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const useDiscoverUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching USERS");

      const token = await asyncStorage.getItem("token");
      console.log('Token:', token); // Debug token

      const headers = {
        Authorization: `Bearer ${token}`
      };
      console.log('Headers:', headers); // Debug headers

      const response = await axios.get(`${apiURL}/api/users/preferences`, { headers });
      console.log('Response:', response.data); // Debug response

      setUsers(response.data);
    } catch (err) {
      console.error('Error details:', err.response || err); // More detailed error logging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     console.log("Fetching USERS");
  //     const token = await asyncStorage.getItem("token");
  //     const response = await axios.get(apiURL + '/api/users/preferences',{
  //       headers: `Bearer ${await asyncStorage.getItem("token")}`
  //     });
  //     setUsers(response.data);
  //     console.log(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { users, loading, error, fetchUsers };
};