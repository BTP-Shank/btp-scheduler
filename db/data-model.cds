
namespace scheduler;
using { managed , cuid } from '@sap/cds/common';
using {Northdata as ext} from '../srv/external/Northdata';

entity  Invoices as projection on ext.Invoices ; 

entity LiveData : managed,cuid{
 datadump : LargeString ;
 username : String(100) ;
}