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
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
  ) {}
  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: any, payload: any): Promise<any> {
    const room = await this.roomService.createRoom(payload.user);

    return {
      message: 'create room successfully',
    };
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
      const token = socket.handshake.headers.authorization;
      const getToken = token.split(' ')[1];
      console.log(getToken);
      const user = await this.authService.verifyJwt(getToken);
      const room = await this.roomService.getRoom(user._id);
      this.server.to(socket.id).emit('room', room);
    } catch (err) {
      console.log(err);
      this.disconnect(socket);
    }
  }
  handleDisconnect(client: any) {
    console.log('disconnect');
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
    console.log('disconnect');
  }
}
