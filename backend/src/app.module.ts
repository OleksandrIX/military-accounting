import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MilitaryEquipment } from "./military-equipment/military-equipment.model";
import { MilitaryEquipmentModule } from "./military-equipment/military-equipment.module";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.MYSQL_DB,
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      entities: [MilitaryEquipment],
      synchronize: true
    }),
    MilitaryEquipmentModule,
  ],
  providers: []
})
export class AppModule {}
