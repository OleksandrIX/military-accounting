import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { Repository } from "typeorm";
import { MilitaryEquipment } from "./military-equipment.model";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMilitaryEquipmentDto } from "./dto/create-military-equipment.dto";

@Controller("military-equipment")
export class MilitaryEquipmentController {
  constructor(@InjectRepository(MilitaryEquipment) private militaryEquipmentRepository: Repository<MilitaryEquipment>) {
  }

  @Get()
  async getAllMilitaryEquipment() {
    return await this.militaryEquipmentRepository.find({});
  }

  @Get(":id")
  async getMilitaryEquipmentById(@Param() params: any) {
    return await this.militaryEquipmentRepository.find({ where: { id: params.id } });
  }

  @Post()
  async createMilitaryEquipment(@Body() dto: CreateMilitaryEquipmentDto) {
    return await this.militaryEquipmentRepository.save({ ...dto });
  }

  @Put()
  async changeMilitaryEquipment(@Body() militaryEquipment: MilitaryEquipment) {
    return await this.militaryEquipmentRepository.update(militaryEquipment.id, militaryEquipment);
  }

  @Delete()
  async deleteMilitaryEquipment(@Body() militaryEquipment: MilitaryEquipment) {
    return await this.militaryEquipmentRepository.delete(militaryEquipment.id);
  }
}
