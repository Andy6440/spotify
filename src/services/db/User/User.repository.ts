// userRepository.ts

import { User } from '../../../interfaces/User'
import { ProfileModel, UserModel } from '../../../models/class/User.model'




class UserRepository {
    async findUserById(id: string): Promise<User | null> {
        return await UserModel.findOne({ id })
    }
        
    async updateUser(id: string,user:User): Promise<User> {
        await ProfileModel.findOneAndUpdate({ id }, user.profile, { new: true, useFindAndModify: false })        
        await UserModel.findOneAndUpdate({ id }, user, { new: true, useFindAndModify: false })
        return user
    }
    
    async createUser(user:User): Promise<User> {
        await ProfileModel.create(user.profile)
        await UserModel.create(user)
        return user
    }    

    
}

export default new UserRepository()