import axios, { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
type voidFunc = () => void
// Generic
export default function useData<T>(
  url: string,
  initState: T = [] as T,
  errorCallback?: voidFunc
): [T, React.Dispatch<React.SetStateAction<T>>, voidFunc] {
  const [data, setData] = useState<T>(initState);
  const getData = useCallback(async () => {
    try {
      const resData = (await axios.get<T>(url)).data
      setData(resData)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (errorCallback) errorCallback()
      }
    }
  }, [url])
  useEffect(() => {
    getData()
  }, [getData])
  const revalidate = () => getData()
  return [data, setData, revalidate]
}