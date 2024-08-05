using {scheduler as db} from '../db/data-model';

service CatalogService {

    action refreshDB( user : String(100) ) returns {
        message : String(1000)
    };

    entity LiveData as projection on db.LiveData ;

    entity Inv as projection on db.Invoices;


}
