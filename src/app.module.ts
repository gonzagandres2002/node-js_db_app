import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { NetworksModule } from './networks/networks.module';

@Module({
  imports: [DevicesModule, NetworksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
