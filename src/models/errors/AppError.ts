class AppError extends Error {
    public readonly statusCode: number;
    public  message: string;
    
    constructor(statusCode: number, message: string) {
       
        super(message)
        this.statusCode = statusCode
        this.message = ''
        this.setDescription(message)
    }


    setDescription (message:string) {
        switch (this.statusCode) {
        case 304:
            this.message = 'Not Modified'
            break
        case 400:
            this.message = 'Bad Request - The request could not be understood by the server due to malformed syntax.'
            break
        case 401:
            this.message = 'Unauthorized - The request requires user authentication.'
            break
        case 403:
            this.message = 'Forbidden - The server understood the request, but is refusing to fulfill it.'
            break
        case 404:
            this.message = 'Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.'
            break
        case 429:
            this.message = 'Too Many Requests - Rate limiting has been applied.'
            break
        case 500:
            this.message = 'Internal Server Error.'
            break
        case 502:
            this.message = 'Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
            break
        case 503:
            this.message = 'Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay.'
            break
        default:
            this.message = message
            break
        }
    } 
}
  
export default AppError