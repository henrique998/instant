import { io } from '../app'

io.on('connect', () => {
  console.log('conn')
})