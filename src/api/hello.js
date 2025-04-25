import axios from 'axios'

export const getHelloMessage = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/hello", {
      params: {
        param: "gpt"
      }
    })
    return res.data
    
  } catch (error) {
    return '에러발생'
    
  }

}

