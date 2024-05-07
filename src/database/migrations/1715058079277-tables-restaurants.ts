import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesRestaurants1715058079277 implements MigrationInterface {
    name = 'TablesRestaurants1715058079277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(50) NOT NULL, \`location\` varchar(150) NULL, \`image\` varchar(300) NOT NULL, UNIQUE INDEX \`idx_name\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tables\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`restaurant_id\` int NULL, \`friendly_name\` varchar(50) NULL, \`desired_people\` int NOT NULL DEFAULT '0', \`min_people\` int NOT NULL DEFAULT '0', \`max_people\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tables\``);
        await queryRunner.query(`DROP INDEX \`idx_name\` ON \`restaurants\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
    }

}
