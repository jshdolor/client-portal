import FormData from '~/Infrastructure/FormData';

class UpdateSiteCompanyRequest extends FormData {
    constructor(data = {}) {
        super();
        this._company_name = data.name;
        this._contact_person_name = data.contactPerson;
        this._company_job_title = data.jobTitle;
        this._contact_person_email = data.email;
        this._contact_person_mobile = data.mobile;
        this._contact_person_landline = data.landline;
    }
}

export default UpdateSiteCompanyRequest;
