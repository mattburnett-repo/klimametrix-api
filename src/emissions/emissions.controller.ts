import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { EmissionsService } from './emissions.service'
import { CreateEmissionDto } from './dto/create-emission.dto'
import { Emission } from './entities/emission.entity'

@Controller('emissions')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @Post()
  create(@Body() createEmissionDto: CreateEmissionDto): Promise<Emission> {
    return this.emissionsService.create(createEmissionDto)
  }

  @Get()
  findAll(@Query('limit') limit = 10): Promise<Emission[]> {
    return this.emissionsService.findAll(limit)
  }

  @Get('stats')
  getStats() {
    return this.emissionsService.getStats()
  }
} 