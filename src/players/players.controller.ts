import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playerService.createUpdateUser(createPlayerDto);
  }

  @Get()
  async searchPlayers(): Promise<Player[]> {
    return await this.playerService.searchPlayers();
  }

  @Get(':id')
  async findPlayer(@Param('id') id: string): Promise<Player> {
    return await this.playerService.findPlayer(id);
  }

  @Patch(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
