import React, { useEffect, useState } from 'react'
import { getHelloMessage } from '../api/hello'

function TestHello() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHelloMessage()
      setMessage(result)
      console.log("fetchData :>   " + result);
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>백엔드 응답:</h2>
      <p>{message}</p>
    </div>
  )
}

export default TestHello
