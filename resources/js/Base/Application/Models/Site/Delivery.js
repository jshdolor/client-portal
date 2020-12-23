import { formatDate } from '~/Framework/Helpers/Date';

export default class SiteDelivery {
    constructor(data = {}) {
        this._trackingNumber = data.tracking_number;
        this._shipmentDate = data.shipment_date;
        this._shipmentNote = data.shipment_note || null;
        this._deliveryNote = data.delivery_note || null;
    }

    get trackingNumber() {
        return this._trackingNumber;
    }
    get shipmentDate() {
        return formatDate(this._shipmentDate, 'dd/LL/yyyy');
    }
    get shipmentNote() {
        return this._shipmentNote;
    }
    get deliveryNote() {
        return this._deliveryNote;
    }
}
