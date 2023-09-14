// userService.ts

import { AccessToken, Profile, User } from '../../../interfaces/User'
import UserRepository from './User.repository'

class UserService {
    async handleUser(profile: Profile, tokens:AccessToken): Promise<User> {
        const user : User = {
            id:profile.id,
            email:profile.email,
            profile:profile,
            token:tokens.access_token,
            refresh:tokens.refresh_token
        } 

        const existingUser = await UserRepository.findUserById(user.id)
        
        if (existingUser) {
            return await UserRepository.updateUser(user.id, user)
        } else {
            return await UserRepository.createUser(user)
        }       
    } 
    async findUser(id:string): Promise<User|null>  {
        return await UserRepository.findUserById(id)    
    }
    async getAll(): Promise<User[]>  {
        return await UserRepository.getAll()    
    }
}

export default new UserService()
