import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow("DB_HOST"),
                port: configService.getOrThrow("DB_PORT"),
                username:  configService.getOrThrow("DB_USER"),
                password:  configService.getOrThrow("DB_PASS"),
                database:  configService.getOrThrow("DB_TABLE"),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow<boolean>("DB_SYNCSCHEMA"),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
