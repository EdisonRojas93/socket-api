import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Controller("chat")
export class ChatController {
  constructor(private readonly chatSocket: ChatGateway) { }

  @Get()
  sendAll() {
    this.chatSocket.server.emit("msg from", "saludando desde la api");
    return "<h1> enviaste un mensaje </h1>";
  }

  @Get(":room")
  sendToRoom(@Param("room") room: string, @Query("msg") msg: string) {
    this.chatSocket.server.to(room).emit("msg from", msg);
    return "<h1> enviaste un mensaje </h1>";
  }
}
