import ValidationException from '~/Infrastructure/Exception/ValidationException';
import UnhandledException from '~/Infrastructure/Exception/UnhandledException';
class ExceptionFactory {
    static make(errCode = 500, error, errorNS) {
        const exceptionClsMapping = {
            422: ValidationException,
        };

        if (exceptionClsMapping[errCode]) {
            throw new exceptionClsMapping[errCode]({ error, errorNS });
        }

        throw new UnhandledException({ error });
    }
}

export default ExceptionFactory;
