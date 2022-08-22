import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_company',
})
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  nit: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;
}
