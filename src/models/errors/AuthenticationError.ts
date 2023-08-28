import AppError from './AppError'

class AuthenticationError extends AppError {
    constructor(message?: string) {
        super(401, message)
    }
}
export default AuthenticationError