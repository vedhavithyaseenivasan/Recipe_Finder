"use client"

import { createContext, useContext, useState } from "react"

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = "info") => {
    const id = Date.now()
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="rf-notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className={`rf-notification rf-notification-${notification.type}`}>
            <div className="rf-notification-content">
              <span>{notification.message}</span>
              <button onClick={() => removeNotification(notification.id)} className="rf-notification-close">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
