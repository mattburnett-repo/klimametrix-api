import { IsNumber, Min, Max, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class MetadataDto {
  @ApiPropertyOptional({ description: 'Equipment name or identifier' })
  @IsOptional()
  equipmentId?: string

  @ApiPropertyOptional({ description: 'Location of measurement' })
  @IsOptional()
  location?: string
}

export class CreateEmissionDto {
  @ApiProperty({ 
    description: 'Monthly electricity usage in kWh',
    minimum: 0,
    maximum: 1000000
  })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  electricity: number

  @ApiProperty({ 
    description: 'Monthly fuel consumption in L',
    minimum: 0,
    maximum: 100000
  })
  @IsNumber()
  @Min(0)
  @Max(100000)
  fuel: number

  @ApiProperty({ 
    description: 'Monthly waste generated in kg',
    minimum: 0,
    maximum: 100000
  })
  @IsNumber()
  @Min(0)
  @Max(100000)
  waste: number

  @ApiPropertyOptional({ type: MetadataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => MetadataDto)
  metadata?: MetadataDto
} 