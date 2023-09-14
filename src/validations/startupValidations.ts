import AuthenticationError from '../models/errors/AuthenticationError'


/**
 * Validates the presence of required environment variables.
 * 
 * Throws an AuthenticationError if any of the required environment variables are missing.
 */
export const validateEnvVariables = () => {
    const requiredVariables = ['USER_ID']
    for (const varName of requiredVariables) {
        if (!process.env[varName]) {
            throw new AuthenticationError(`Environment variable ${varName} is missing!`)
        }
    }
}

