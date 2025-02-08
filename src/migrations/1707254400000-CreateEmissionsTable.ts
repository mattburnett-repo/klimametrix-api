import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEmissionsTable1707254400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "emissions",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "electricity",
                    type: "float",
                },
                {
                    name: "fuel",
                    type: "float",
                },
                {
                    name: "waste",
                    type: "float",
                },
                {
                    name: "totalEmissions",
                    type: "float",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "metadata",
                    type: "jsonb",
                    isNullable: true,
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("emissions")
    }
} 