import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserInterface, UserTokenInterface } from 'src/user/interfaces';
import { UserService, UserTokenService } from 'src/user/services';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as _ from 'lodash';



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
        return _.omit(createdUser, 'password');
        
      }

      async accountActivation({token, password}:{token: string, password:string}): Promise<boolean> {
        const userToken = await this.userTokenService.findByToken(token);
        if(!userToken){
          throw new NotFoundException("User token does not exist!");
        }
        const { expiredAt } = userToken;
        if(this.isExpired(expiredAt)){
          throw new UnauthorizedException("Token has expired")
        }
        const user = await this.userService.findById(userToken.userId);
        if(user.isActive){
          throw new ConflictException("Email Already Activated!");
        }
        await this.userService.updateUser(userToken.userId, { password: await this.hashPassword(password), isActive: true  })
        return true
      }

      public hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
      }

      public isExpired(expiredAt) {
        const currentDate = new Date();
        return expiredAt < currentDate;
      }
    
    

}