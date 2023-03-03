import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  /**
   * Pokemonデータを取得
   * @param id
   * @returns
   */
  async getPokemonWithLocalCache(id: number): Promise<string> {
    // キャッシュサービスからデータを取得する
    const cachedData = await this.cacheService.get<{
      name: string;
      species: string;
    }>(id.toString());
    // キャッシュが見つかった場合はそのまま返す
    if (cachedData) {
      console.log(`🐵 キャッシュが見つかったのでキャッシュから返します。 `);
      console.log(cachedData.species);
      return `${cachedData.name}`;
    }
    console.log('🈲 キャッシュが見つからなかったので、APIから取得します。');
    // if not, call API and set the cache:
    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    console.log('name:', data.name, ' ', data.species);
    // キャッシュを設定する
    // 個別のttl指定はRedisを使う場合は利用できない？
    await this.cacheService.set(id.toString(), data, 5000);
    return await `${data.name}`;
  }
}
