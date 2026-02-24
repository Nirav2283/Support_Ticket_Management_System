import { Test, TestingModule } from '@nestjs/testing';
import { TicketStatusLogsController } from './ticket_status_logs.controller';
import { TicketStatusLogsService } from './ticket_status_logs.service';

describe('TicketStatusLogsController', () => {
  let controller: TicketStatusLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketStatusLogsController],
      providers: [TicketStatusLogsService],
    }).compile();

    controller = module.get<TicketStatusLogsController>(TicketStatusLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
