import { Test, TestingModule } from '@nestjs/testing'
import { EmissionsController } from '../../src/emissions/emissions.controller'
import { EmissionsService } from '../../src/emissions/emissions.service'
import { CreateEmissionDto } from '../../src/emissions/dto/create-emission.dto'

describe('EmissionsController', () => {
  let controller: EmissionsController
  let service: EmissionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmissionsController],
      providers: [
        {
          provide: EmissionsService,
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({
              id: 'test-id',
              ...dto,
              totalEmissions: 100,
              createdAt: new Date(),
            })),
            findAll: jest.fn().mockResolvedValue([]),
            getStats: jest.fn().mockResolvedValue({
              total: 1000,
              average: 100,
              count: 10,
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<EmissionsController>(EmissionsController)
    service = module.get<EmissionsService>(EmissionsService)
  })

  it('should create an emission record', async () => {
    const dto: CreateEmissionDto = {
      electricity: 100,
      fuel: 50,
      waste: 25,
    }

    const result = await controller.create(dto)
    expect(result).toHaveProperty('id')
    expect(result.electricity).toBe(dto.electricity)
    expect(service.create).toHaveBeenCalledWith(dto)
  })

  it('should get emission stats', async () => {
    const stats = await controller.getStats()
    expect(stats).toHaveProperty('total')
    expect(stats).toHaveProperty('average')
    expect(stats).toHaveProperty('count')
  })
}) 