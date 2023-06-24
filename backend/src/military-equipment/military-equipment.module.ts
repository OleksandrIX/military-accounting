import { Module } from '@nestjs/common';
import { MilitaryEquipmentService } from './military-equipment.service';
import { MilitaryEquipmentController } from './military-equipment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MilitaryEquipment } from "./military-equipment.model";

@Module({
  providers: [MilitaryEquipmentService],
  controllers: [MilitaryEquipmentController],
  imports: [
    TypeOrmModule.forFeature([MilitaryEquipment])
  ],
})
export class MilitaryEquipmentModule {}
