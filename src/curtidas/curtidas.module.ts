import { Module } from '@nestjs/common';
import { CurtidasController } from './curtidas.controller';
import { CurtidasService } from './curtidas.service';

@Module({
  controllers: [CurtidasController],
  providers: [CurtidasService]
})
export class CurtidasModule {}
