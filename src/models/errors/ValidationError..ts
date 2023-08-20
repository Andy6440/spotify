import AppError from './AppError'

class ValidationError extends AppError {
    constructor(message?: string) {
        super(400, message)
    }
}

export default ValidationError