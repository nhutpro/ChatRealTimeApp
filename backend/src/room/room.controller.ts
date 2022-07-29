import { Controller, Get, Res, Req, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get(':id')
  async getRoom(@Req() req: any) {
    return await this.roomService.getRoom(req.params.id);
  }

  @Post('createTwoRoom')
  async createTwoRoom(@Req() req: any) {
    return await this.roomService.createTwoRoom(req.body.users);
  }
}
