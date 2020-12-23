import UnhandledException from '~/Infrastructure/Exception/UnhandledException';

class CSVReader {
    constructor(file, headers, cb) {
        this.file = file;
        this.reader = new FileReader();
        this.reader.readAsText(this.file);
        this.reader.onload = this.loadHandler.bind(this, cb);
        this.reader.onerror = this.errorHandler;
        this.headers = headers;

        this.csvData = [];
    }

    async getData() {
        return new Promise((res, rej) => {
            while (!this.loaded) {}
        });
    }

    loadHandler(cb) {
        var csv = this.reader.result;
        this.processData(csv);
        cb(this.csvData);
    }

    processData(csv) {
        const lines = csv.split(/\r\n|\n/).filter((line) => {
            return line.split(',').some((entry) => !!entry);
        });
        const result = [];

        const headers = lines[0].split(',');
        //do checking of valid file format
        if (!this.checkIfValidFormat(headers)) {
            throw new UnhandledException({
                message: 'Invalid File Format',
            });
        }

        for (var i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                let key = this.headers.find((h) => h.external === headers[j])
                    ?.value;

                obj[key] = currentline[j];
            }

            result.push(obj);
        }

        this.csvData = result;
    }

    checkIfValidFormat(headers) {
        const csvHeaders = this.headers.map((h) => h.external);

        return csvHeaders.every((h) => {
            return headers.indexOf(h) > -1;
        });
    }

    errorHandler(evt) {
        if (evt.target.error.name == 'NotReadableError') {
            throw new UnhandledException({
                message: 'Cannot read file',
            });
        }
    }
}

export default CSVReader;
