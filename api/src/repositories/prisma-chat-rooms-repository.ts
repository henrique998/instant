import { ChatRoom } from 'src/models/chat-room'
import { prisma } from '../config/prisma'
import { IChatRoomRepository } from './IChatRoomRepository'

export class PrismaChatRoomsRepository implements IChatRoomRepository {
  async findAll(userId: string): Promise<ChatRoom[]> {
    const data = await prisma.chatRoom.findMany({
      where: {
        members: {
          has: userId,
        },
      },
    })

    const chatRooms = data.map((chat) => {
      return new ChatRoom(
        {
          members: chat.members,
          socketId: chat.socketId,
          createdAt: chat.createdAt,
        },
        chat.id,
      )
    })

    return chatRooms
  }

  async findByUsers(usersIds: string[]): Promise<ChatRoom | null> {
    const data = await prisma.chatRoom.findFirst({
      where: {
        members: { hasEvery: usersIds },
      },
    })

    if (!data) {
      return null
    }

    const chatRoom = new ChatRoom(
      {
        members: data.members,
        socketId: data.socketId,
        createdAt: data.createdAt,
      },
      data.id,
    )

    return chatRoom
  }

  async findByRoomId(roomId: string): Promise<ChatRoom | null> {
    const room = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
      },
    })

    if (!room) {
      return null
    }

    const chatRoom = new ChatRoom(
      {
        members: room.members,
        socketId: room.socketId,
        createdAt: room.createdAt,
      },
      room.id,
    )

    return chatRoom
  }

  async create(chatRooms: ChatRoom[]): Promise<void> {
    const data = chatRooms.map((chat) => {
      return {
        id: chat.id,
        members: chat.members,
        socketId: chat.socketId,
        createdAt: chat.createdAt,
      }
    })

    await prisma.chatRoom.createMany({
      data,
    })
  }

  async save(chatRoom: ChatRoom): Promise<void> {
    await prisma.chatRoom.update({
      where: {
        id: chatRoom.id,
      },
      data: {
        id: chatRoom.id,
        members: chatRoom.members,
        socketId: chatRoom.socketId,
        createdAt: chatRoom.createdAt,
      },
    })
  }

  async delete(roomId: string): Promise<void> {
    await prisma.chatRoom.delete({
      where: {
        id: roomId,
      },
    })
  }
}
