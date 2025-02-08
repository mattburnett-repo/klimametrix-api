import { DataSource } from 'typeorm'
import { Emission } from '../../emissions/entities/emission.entity'

export const initialSeed = async (dataSource: DataSource) => {
  const emissionRepository = dataSource.getRepository(Emission)

  const seedData = [
    {
      electricity: 2400,
      fuel: 1800,
      waste: 800,
      totalEmissions: 5000,
      createdAt: new Date('2024-01-15')
    },
    {
      electricity: 2200,
      fuel: 1600,
      waste: 700,
      totalEmissions: 4500,
      createdAt: new Date('2024-02-15')
    },
    {
      electricity: 2000,
      fuel: 1500,
      waste: 600,
      totalEmissions: 4100,
      createdAt: new Date('2024-03-15')
    }
  ]

  await emissionRepository.save(seedData)
} 