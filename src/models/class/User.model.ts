import { Schema,model,Document } from 'mongoose'
import { AccessToken } from '../../interfaces/User'


interface Image {
    url : string;
    height : string;
    width : string;
}

interface ExternalUrls {
    spotify : string
}

interface Profile extends Document {
    id : string;    
    display_name : string ;
    external_urls :ExternalUrls;
    images : Image[];
    type : string;
    uri : string;
    followers:{
        href : string | null;
        total : number;
    };
    country: string;
    product: string;
    explicit_content:{
        filter_enabled : boolean;
        filter_locked : boolean;
    };
    email:string;
}

const ProfileSchema = new Schema({
    id : { type: String, required: true },
    display_name : { type: String, required: true },
    external_urls : { type: Object, required: true },
    images : { type: Array, required: true },
    type : { type: String, required: true },
    uri : { type: String, required: true },
    followers : { type: Object, required: true },
    country : { type: String, required: true },
    product : { type: String, required: true },
    explicit_content : { type: Object, required: true },
    email : { type: String, required: true },

})
export const ProfileModel = model<Profile>('Profile',ProfileSchema)

interface User extends Document {
    id:string;
    email:string;
    profile:Profile;
    AccessToken:AccessToken;
}

const UserSchema = new Schema({
    id : { type: String, required: true },
    email : { type: String, required: true },
    profile :ProfileSchema,
    refresh_token : {type: String, required: true},
    AccessToken : {type: Object, required: true}
})

export const UserModel = model<User>('User',UserSchema)