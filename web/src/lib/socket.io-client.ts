import { io } from 'socket.io-client'

export function socketInstance(userId?: string) {
  return io('https://3333-henrique998-instant-edbtw68qswi.ws-us106.gitpod.io', {
    auth: {
      userId,
    },
  })
}
