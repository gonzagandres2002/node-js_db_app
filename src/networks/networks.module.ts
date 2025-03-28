import { Module } from '@nestjs/common';
import { NetworksService } from './networks.service';
import { NetworksController } from './networks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NetworksController],
  providers: [NetworksService, PrismaService],
})
export class NetworksModule {}
