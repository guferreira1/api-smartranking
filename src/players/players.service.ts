import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdateUser(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Criação do player: ${JSON.stringify(createPlayerDto)}`);
    this.create(createPlayerDto);
    this.logger.log('Player criado.');
  }

  async searchPlayers() {
    return await this.players;
  }

  async findPlayer(id: string) {
    const player = this.players.find((p) => p._id === id);

    if (!player) {
      throw new NotFoundException(`Jogador de id: ${id} não encontrado`);
    }

    return player;
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto) {
    const player: Player = this.players.find((p) => p._id === id);

    if (!player) {
      throw new NotFoundException(`Jogador de id: ${id} não encontrado`);
    }

    player.name = updatePlayerDto.name;

    return player;
  }

  async deletePlayer(id: string) {
    const player = this.players.findIndex((p) => p._id == id);

    if (!player) {
      throw new NotFoundException(`Jogador de id: ${id} não encontrado`);
    }

    this.players.splice(player, 1);
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { email, name, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      email,
      name,
      phoneNumber,
      photoUrl: 'www.google.com.br/foto123.jpg',
      positionRanking: 1,
      ranking: 'A',
    };

    this.players.push(player);
  }
}
