// userRepository.ts

import { User } from '../../../interfaces/User'
import { ProfileModel, UserModel } from '../../../models/class/User.model'



/**
 * Repository class for managing user-related database operations.
 */
class UserRepository {
    /**
     * Finds a user by their ID.
     * 
     * @param id - The ID of the user to find.
     * @returns A promise that resolves to the found user or null if not found.
     */
    async findUserById(id: string): Promise<User | null> {
        return await UserModel.findOne({ id })
    }
    
    async getAll(): Promise<User[]> {
        return await UserModel.find()
    }
        
    /**
     * Updates a user's details and profile.
     * 
     * @param id - The ID of the user to update.
     * @param user - The updated user data.
     * @returns A promise that resolves to the updated user.
     */
    async updateUser(id: string,user:User): Promise<User> {
        await ProfileModel.findOneAndUpdate({ id }, user.profile, { new: true, useFindAndModify: false })        
        await UserModel.findOneAndUpdate({ id }, user, { new: true, useFindAndModify: false })
        return user
    }

    /**
     * Creates a new user and their profile.
     * 
     * @param user - The user data to create.
     * @returns A promise that resolves to the created user.
     */    
    async createUser(user:User): Promise<User> {   
        await ProfileModel.create(user.profile)     
        await UserModel.create(user)
        return user
    }    

    
}

export default new UserRepository()