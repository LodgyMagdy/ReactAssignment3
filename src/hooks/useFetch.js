import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useFetch(queryKey , endPoint , userData) {
    const {data , isLoading , isError , error} = useQuery({
    queryKey: queryKey,
    queryFn: getPosts,
    select: (data) => data.data,
    enabled: !!userData
  })

  async function getPosts () {

    return axios.get(`${import.meta.env.VITE_BASE_URL}/${endPoint}` , {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }

  return {
    data,
    isLoading,
    isError,
    error
  }
}