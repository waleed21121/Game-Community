class apiError extends Error {
    constructor() {
        super();
    }
    create (statusCode, statusText, message) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.message = message;
        return this;
    }
}

module.exports = apiError;