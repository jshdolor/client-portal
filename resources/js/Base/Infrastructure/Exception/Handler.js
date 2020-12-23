import { propertyValue } from '~/Framework/Helpers';
import ExceptionFactory from '~/Infrastructure/Factories/ExceptionFactory';

class ExceptionHandler {
    constructor({ error, errorNS }) {
        const statusCode = error?.response?.status;

        const errorData = error?.response?.data;

        return ExceptionFactory.make(statusCode, errorData, errorNS);
    }
}

export default ExceptionHandler;
