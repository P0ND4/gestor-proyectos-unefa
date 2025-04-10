import { Module } from '@nestjs/common';
import { PrismaService } from './prima.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
