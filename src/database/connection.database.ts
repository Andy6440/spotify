import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/spotify')
        console.log('Conectado a MongoDB', mongoose.connection.host)
    } catch (error) {
        console.log('Conectado a MongoDB', error)
    }
}

export default connectDB