import { Test, TestingModule } from '@nestjs/testing';
import { TicketCommentsController } from './ticket_comments.controller';
import { TicketCommentsService } from './ticket_comments.service';

describe('TicketCommentsController', () => {
  let controller: TicketCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketCommentsController],
      providers: [TicketCommentsService],
    }).compile();

    controller = module.get<TicketCommentsController>(TicketCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
