import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmissionsController } from './emissions.controller'
import { EmissionsService } from './emissions.service'
import { Emission } from './entities/emission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Emission])],
  controllers: [EmissionsController],
  providers: [EmissionsService],
})
export class EmissionsModule {} 