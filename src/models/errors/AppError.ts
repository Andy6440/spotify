class AppError extends Error {
    public readonly statusCode: number;
    public  message = 'An error occurred.'
    
    constructor(statusCode: number, message?: string) {
       
        super(message)
        this.statusCode = statusCode
        if (!message) {
            this.message = this.getDefaultMessage(statusCode)
        }
    }


    private getDefaultMessage (statusCode:number) {
        switch (statusCode) {
        case 304: return 'Not Modified'
        case 400: return 'Bad Request - The request could not be understood by the server due to malformed syntax.'
        case 401: return 'Unauthorized - The request requires user authentication.'
        case 403: return 'Forbidden - The server understood the request, but is refusing to fulfill it.'
        case 404: return 'Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.'
        case 429: return 'Too Many Requests - Rate limiting has been applied.'
        case 500: return 'Internal Server Error.'
        case 502: return 'Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
        case 503: return 'Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay.'
        default: return 'An error occurred.'
        }
    } 
}
  
export default AppError