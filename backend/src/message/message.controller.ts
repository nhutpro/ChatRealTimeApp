import { Body, Controller, Get, Req } from '@nestjs/common';
import { MessageService } from './message.service';
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  async getMessageInRoom(@Req() req: any) {
    // console.log(req.query);
    return await this.messageService.getMessageInRoom(req.query.roomId);
  }
}
