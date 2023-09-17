// userService.ts

import { AccessToken, Profile, User } from '../../../interfaces/User'
import UserRepository from './User.repository'

class UserService {
    async handleUser(profile: Profile, tokens:AccessToken): Promise<User> {

        const accessToken : AccessToken = {
            access_token:tokens.access_token,
            refresh_token:tokens.refresh_token,
            expires_in:tokens.expires_in,
            scope:tokens.scope,
            token_type:tokens.token_type
        }

        const user : User = {
            id:profile.id,
            email:profile.email,
            profile:profile,
            AccessToken:accessToken,
            refresh_token:tokens.refresh_token ? tokens.refresh_token : ''
        } 

        const existingUser = await UserRepository.findUserById(user.id)
        
        if (existingUser) {
            return await UserRepository.updateUser(user.id, user)
        } else {
            return await UserRepository.createUser(user)
        }       
    } 
    async updateToken(id: string, tokens:AccessToken): Promise<User|null> {
        const user = await UserRepository.findUserById(id)
        if(!user){
            return null
        }  
        const accessToken : AccessToken = {
            access_token:tokens.access_token,
            refresh_token:user.refresh_token,
            expires_in:tokens.expires_in,
            scope:tokens.scope,
            token_type:tokens.token_type
        }

        user.AccessToken = accessToken
        return await UserRepository.updateUser(id, user)
     
    } 
    async findUser(id:string): Promise<User|null>  {
        return await UserRepository.findUserById(id)    
    }
    async getAll(): Promise<User[]>  {
        return await UserRepository.getAll()    
    }
}

export default new UserService()
