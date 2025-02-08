import { IsNumber, Min, Max, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class MetadataDto {
  @IsOptional()
  equipmentId?: string

  @IsOptional()
  location?: string
}

export class CreateEmissionDto {
    description: 'Monthly electricity usage in kWh',
    minimum: 0,
    maximum: 1000000
  })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  electricity: number

    description: 'Monthly fuel consumption in L',
    minimum: 0,
    maximum: 100000
  })
  @IsNumber()
  @Min(0)
  @Max(100000)
  fuel: number

    description: 'Monthly waste generated in kg',
    minimum: 0,
    maximum: 100000
  })
  @IsNumber()
  @Min(0)
  @Max(100000)
  waste: number

  @IsOptional()
  @ValidateNested()
  @Type(() => MetadataDto)
  metadata?: MetadataDto
} 