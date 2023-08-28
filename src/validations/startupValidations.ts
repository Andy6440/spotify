import AuthenticationError from '../models/errors/AuthenticationError'

export const validateEnvVariables = () => {
    const requiredVariables = ['TOKEN', 'USER_ID']
    console.log('Validating environment variables...')
    for (const varName of requiredVariables) {
        if (!process.env[varName]) {
            throw new AuthenticationError(`Environment variable ${varName} is missing!`)
        }
    }
    console.log('Environment variables are valid!')
}

