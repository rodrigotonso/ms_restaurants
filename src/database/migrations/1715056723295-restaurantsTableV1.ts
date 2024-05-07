import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantsTableV11715056723295 implements MigrationInterface {
    name = 'RestaurantsTableV11715056723295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(50) NULL, \`location\` varchar(150) NULL, \`image\` varchar(300) NULL, UNIQUE INDEX \`idx_name\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_name\` ON \`restaurants\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
    }

}
