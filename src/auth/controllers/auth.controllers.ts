import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services';
import { UserInterface } from 'src/user/interfaces';
import { AuthAccountActivationDto, AuthLoginDto, AuthRegisterDto } from 'src/auth/dtos';
import { LoginInterface } from 'src/auth/interfaces';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService : AuthService
  ){}

  
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, description: 'Returns Registered user' })
  @Post('signup')
  async signup(@Body() authRegisterDto: AuthRegisterDto): Promise<UserInterface> {
    return this.authService.register(authRegisterDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Returns access token' })
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto): Promise<LoginInterface> {
    return this.authService.login(authLoginDto);
  }

  @ApiOperation({ summary: 'Activate user account' })
  @ApiResponse({ status: 200, description: 'Returns true if account has been activated' })
  @Post('account-activation')
  async accountActivation(@Body() authAccountActivationDto: AuthAccountActivationDto): Promise<boolean> {
    return this.authService.accountActivation(authAccountActivationDto);
  }


}
