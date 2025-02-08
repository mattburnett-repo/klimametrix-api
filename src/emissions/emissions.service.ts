import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Emission } from './entities/emission.entity'
import { CreateEmissionDto } from './dto/create-emission.dto'

interface EmissionStats {
  total: string
  average: string
  count: string
}

@Injectable()
export class EmissionsService {
  constructor(
    @InjectRepository(Emission)
    private emissionsRepository: Repository<Emission>
  ) {}

  findAll(limit = 10): Promise<Emission[]> {
    return this.emissionsRepository.find({
      order: { createdAt: 'DESC' },
      take: limit
    })
  }

  create(createEmissionDto: CreateEmissionDto): Promise<Emission> {
    const totalEmissions = createEmissionDto.electricity + createEmissionDto.fuel + createEmissionDto.waste    
    const emission = this.emissionsRepository.create({
      ...createEmissionDto,
      totalEmissions
    })
    return this.emissionsRepository.save(emission)
  }

  async getStats() {
    const emissions = await this.emissionsRepository
      .createQueryBuilder('emission')
      .select('SUM(emission.totalEmissions)', 'total')
      .addSelect('AVG(emission.totalEmissions)', 'average')
      .addSelect('COUNT(*)', 'count')
      .getRawOne<EmissionStats>()

    return {
      total: Number(emissions?.total ?? 0),
      average: Number(emissions?.average ?? 0),
      count: Number(emissions?.count ?? 0),
    }
  }
} 