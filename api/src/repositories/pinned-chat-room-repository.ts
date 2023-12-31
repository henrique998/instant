import { ChatRoom } from '../models/chat-room'

export interface PinnedChatRoomParams {
  ownerId: string
  roomId: string
}

export interface IPinnedChatRoomRepository {
  findAll(userId: string): Promise<ChatRoom[]>
  findById(roomId: string): Promise<ChatRoom | null>
  findByUserId(userId: string): Promise<ChatRoom | null>
  create(data: PinnedChatRoomParams): Promise<void>
  delete(roomId: string): Promise<void>
}
