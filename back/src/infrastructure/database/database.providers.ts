import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { Company } from '../../domain/entities/company.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return await createConnection({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [Company],

        synchronize: true,
        logging: true,
      });
    },
  },
];
