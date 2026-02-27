import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RelatosModule } from './relatos/relatos.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, RelatosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
