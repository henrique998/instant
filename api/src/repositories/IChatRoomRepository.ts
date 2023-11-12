import { ChatRoom } from 'src/models/chat-room'

export interface IChatRoomRepository {
  findAll(): Promise<ChatRoom[]>
  findByUsers(usersIds: string[]): Promise<ChatRoom | null>
  findByRoomId(roomId: string): Promise<ChatRoom | null>
  create(chatRooms: ChatRoom[]): Promise<void>
  delete(roomId: string): Promise<void>
}
