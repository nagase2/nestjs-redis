import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
