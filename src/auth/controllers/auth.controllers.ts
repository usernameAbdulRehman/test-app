import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services';
import { UserInterface } from 'src/user/interfaces';
import { AuthAccountActivationDto, AuthRegisterDto } from 'src/auth/dtos';

@Controller()
export class AuthController {
  constructor(
    private readonly authService : AuthService
  ){}

  @Post('signup')
  async signup(@Body() authRegisterDto: AuthRegisterDto): Promise<UserInterface> {
    return this.authService.register(authRegisterDto);
  }

  @Post('account-activation')
  async accountActivation(@Body() authAccountActivationDto: AuthAccountActivationDto): Promise<boolean> {
    return this.authService.accountActivation(authAccountActivationDto);
  }


}
