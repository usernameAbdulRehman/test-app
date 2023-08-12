import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {  UserPreferenceInterface } from 'src/user/interfaces';
import { UserPreferenceService } from 'src/user/services';
import { UserPreferenceCreateDto } from 'src/user/dtos';
import { AuthGuard } from 'src/auth/guards';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
@ApiTags('User')
@ApiBearerAuth()
@Controller()
export class UserPreferenceController {
  constructor(
    private readonly userPrefService : UserPreferenceService
  ){}

  @ApiOperation({ summary: 'Create user preference' })
  @ApiResponse({ status: 200, description: 'Returns created user preference' })
  @UseGuards(AuthGuard)
  @Post('create-user-preference')
  async createUserPreference(@Body() preference: UserPreferenceCreateDto): Promise<UserPreferenceInterface> {
    return this.userPrefService.createUserPreference(preference);
  }


}
