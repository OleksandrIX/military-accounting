import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class MilitaryEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  countOfEquipment: number;

  @Column({type: 'date'})
  date: string
}