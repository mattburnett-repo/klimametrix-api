import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'
import { initialSeed } from './initial.seed'

// Load environment variables
ConfigModule.forRoot()

// Create a new data source
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
})

const seed = async () => {
  try {
    await dataSource.initialize()
    console.log('Connected to database')

    await initialSeed(dataSource)
    console.log('Seed data inserted')

    await dataSource.destroy()
    console.log('Connection closed')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

seed() 

// asdf