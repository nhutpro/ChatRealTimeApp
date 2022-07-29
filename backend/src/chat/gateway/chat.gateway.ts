import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { MessageService } from 'src/message/message.service';
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
  ) {}
  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: any, payload: any): Promise<any> {
    const room = await this.roomService.createRoom(payload.user);

    return {
      message: 'create room successfully',
    };
  }
  @SubscribeMessage('cTsjoinRoom')
  async joinRoom(client: Socket, payload: any): Promise<any> {
    const SocketId = client.id;
    const room: any = await this.roomService.createTwoRoom(payload.users);
    client.join(room._id.toString().trim());
    console.log('room._id', room._id.toString().trim());
    console.log('cTsjoinRoom');

    this.server.to(SocketId).emit('sTcjoinRoom', {
      room,
    });
  }

  @SubscribeMessage('cTsnewMessage')
  async newMessage(client: any, payload: any): Promise<any> {
    const message = await this.messageService.createMessage(payload);
    console.log('message', message.message);
    this.server.to(payload.room.trim()).emit('sTcRoomMessage', {
      message: message,
    });
  }
  @SubscribeMessage('getRoom')
  async handleGetRoom(client: any, payload: any): Promise<any> {
    const room = await this.roomService.createRoom(payload.user);

    return {
      message: 'create room successfully',
    };
  }

  async handleConnection(socket: Socket) {
    try {
      console.log('connect from', socket.id);
      // const token = socket.handshake.headers.authorization;
      // const getToken = token.split(' ')[1];

      // const user = await this.authService.verifyJwt(getToken);
      // const room = await this.roomService.getRoom(user._id);
      // this.server.to(socket.id).emit('room', room);
    } catch (err) {
      console.log(err);
      this.disconnect(socket);
    }
  }
  handleDisconnect(socket: Socket) {
    console.log('disconnect from:', socket.id);
    socket.disconnect();
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
    console.log('disconnect');
  }
}
