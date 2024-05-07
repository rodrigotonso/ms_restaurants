import { MigrationInterface, QueryRunner } from "typeorm";

export class Reservations1715060393621 implements MigrationInterface {
    name = 'Reservations1715060393621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`table_id\` int NOT NULL, \`customer_id\` int NOT NULL, \`date\` date NOT NULL, INDEX \`idx_key_table_date\` (\`table_id\`, \`date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`table_availability\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`table_id\` int NOT NULL, \`week_day\` int NOT NULL DEFAULT '0', \`start_hour\` time NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`restaurant_id\` \`restaurant_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`restaurant_id\` \`restaurant_id\` int NULL`);
        await queryRunner.query(`DROP TABLE \`table_availability\``);
        await queryRunner.query(`DROP INDEX \`idx_key_table_date\` ON \`reservations\``);
        await queryRunner.query(`DROP TABLE \`reservations\``);
    }

}
