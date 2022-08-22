import { Connection } from 'typeorm';
import { Company } from '../../domain/entities/company.entity';

export const CompanyProvider = [
  {
    provide: 'CompanyRepository',
    useFactory: (connection: Connection) => connection.getRepository(Company),
    inject: ['DATABASE_CONNECTION'],
  },
];
