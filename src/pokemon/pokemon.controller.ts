import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  //@UseInterceptors(CacheInterceptor)
  //@CacheKey('custom-key')
  //@CacheTTL(5000) // override TTL to 30 seconds
  @Get('/:id')
  async getPokemon(@Param('id') id: number): Promise<string> {
    console.log('🐔 id: ', id);
    return await this.pokemonService.getPokemonWithLocalCache(+id);
  }

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    console.log(createPokemonDto);
    return this.pokemonService.create(createPokemonDto);
  }

  @Post('test')
  test(@Body() value: { aa: string }) {
    console.log(value);
    //return this.pokemonService.create(value);
    return value;
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
