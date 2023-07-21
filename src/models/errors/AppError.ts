class AppError extends Error {
    public readonly statusCode: number;
    public readonly message: string;
  
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.message = message
    }
}
  
export default AppError