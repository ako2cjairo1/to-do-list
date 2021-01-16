import { useEffect } from "react"

export default function Alert({ type, msg, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [removeAlert])

  return (
    <div className="alert">
      <h4 className={`alert-${type}`}>{msg}</h4>
    </div>
  )
}