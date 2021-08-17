import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "chat",
  cors: { origin: "http://localhost:3000" },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger("ChatGateway");
  @WebSocketServer() server: Server;

  @SubscribeMessage("create")
  createRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    client.join(payload.room);
    this.logger.log(`User join to room`, payload.room);
  }

  @SubscribeMessage("msg to")
  message(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    client.to(payload.room).emit("msg from", payload.msg);
  }

  afterInit(server: any) {
    console.log("init", server);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log("client connect", client.id);
    console.log(args);
    client.emit("wellcome", "Wellcome new user");
  }
  handleDisconnect(client: any) {
    console.log("client disconect", client.id);
  }
}
