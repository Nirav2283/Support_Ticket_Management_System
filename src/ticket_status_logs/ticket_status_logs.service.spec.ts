import { Test, TestingModule } from '@nestjs/testing';
import { TicketStatusLogsService } from './ticket_status_logs.service';

describe('TicketStatusLogsService', () => {
  let service: TicketStatusLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketStatusLogsService],
    }).compile();

    service = module.get<TicketStatusLogsService>(TicketStatusLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
