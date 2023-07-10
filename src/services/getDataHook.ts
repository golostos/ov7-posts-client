import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
type voidFunc = () => void
// Generic
export default function useData<T>(
  url: string,
  initState: T = [] as T,
  errorCallback?: voidFunc,
): [T, React.Dispatch<React.SetStateAction<T>>, voidFunc, boolean] {
  const [data, setData] = useState<T>(initState);
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    try {
      setLoading(true)
      const resData = (await axios.get<T>(url)).data
      setData(resData)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (errorCallback) errorCallback()
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [url])
  // const getData = useCallback(async () => {
  //   try {
  //     setLoading(true)
  //     const resData = (await axios.get<T>(url)).data
  //     setData(resData)
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       console.error(error)
  //       if (errorCallback) errorCallback()
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [url])
  // useEffect(() => {
  //   getData()
  // }, [getData])
  const revalidate = () => getData()
  // const revalidate = useCallback(() => getData(), [getData])
  return [data, setData, revalidate, loading]
}