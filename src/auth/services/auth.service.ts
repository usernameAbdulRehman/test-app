import { ConflictException, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/user/interfaces';
import { UserService, UserTokenService } from 'src/user/services';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';



@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly userTokenService : UserTokenService
      ){}

      async register(input: UserInterface): Promise<UserInterface> {
        const { email } = input;
        const user = await this.userService.findByEmail(email);
        if(user){
          throw new ConflictException("Email Already Exists!");
        }
        const randomPass = await this.hashPassword(Math.random().toString(36).substring(2))
        const createdUser = await this.userService.createUser({...input, password:randomPass});

        const expiredAt = new Date();
        expiredAt.setTime(expiredAt.getTime() + 2 * 60 * 60 * 1000);
        const token = randomBytes(20).toString('hex');
        await this.userTokenService.createUserToken({userId:createdUser.id, expiredAt, token })
        return createdUser;
        
      }

      public hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
      }
    
    

}