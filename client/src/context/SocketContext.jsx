import React, { createContext, useContext } from 'react'

// Placeholder: implement socket.io here in the future
const Ctx = createContext(null)
export function SocketProvider({ children }) {
  return <Ctx.Provider value={{}}>{children}</Ctx.Provider>
}
export const useSocket = () => useContext(Ctx)
