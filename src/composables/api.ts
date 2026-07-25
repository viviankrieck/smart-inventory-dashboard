import axios from 'axios';

export function useApi(endpoint: string) {
  async function list() {
    try {
      return await axios.get(`https://dummyjson.com/${endpoint}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function find(id: string) {
    try {
      return await axios.get(`https://dummyjson.com//${endpoint}/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function update(id: string) {
    try {
      return await axios.put(`https://dummyjson.com//${endpoint}/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function create(payload: object) {
    try {
      return await axios.post(`https://dummyjson.com//${endpoint}`, payload);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function remove(id: string, payload: object) {
    try {
      return await axios.delete(`https://dummyjson.com//${endpoint}/${id}`, payload);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return {
    list,
    find,
    update,
    create,
    remove,
  };
}
