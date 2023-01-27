import { useState } from "react"

export default function useDoubleClick () {
    const [ lastClickTime, setClickTime ] = useState(0)

    return (callback) => (e) => {
      const currentTime = e.timeStamp
      const gap = currentTime - lastClickTime
      if (gap > 0 && gap < 300) {
        callback && callback(e)
      }
      setClickTime(currentTime)
    }
  }
