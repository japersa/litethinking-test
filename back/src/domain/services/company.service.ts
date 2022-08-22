import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from './crud.service';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService extends CrudService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {
    super(repository);
  }
}
