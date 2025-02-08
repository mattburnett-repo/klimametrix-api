import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { EmissionsService } from './emissions.service'
import { CreateEmissionDto } from './dto/create-emission.dto'
import { Emission } from './entities/emission.entity'

@ApiTags('emissions')
@Controller('emissions')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new emission record' })
  @ApiResponse({ status: 201, description: 'Record created successfully' })
  create(@Body() createEmissionDto: CreateEmissionDto): Promise<Emission> {
    return this.emissionsService.create(createEmissionDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get emission records' })
  @ApiResponse({ status: 200, description: 'Returns emission records' })
  findAll(@Query('limit') limit = 10): Promise<Emission[]> {
    return this.emissionsService.findAll(limit)
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get emission statistics' })
  @ApiResponse({ status: 200, description: 'Returns emission statistics' })
  getStats() {
    return this.emissionsService.getStats()
  }
} 