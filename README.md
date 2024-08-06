Project Description:

1. create a cap service which pulls data from any external sources and saves it in a hdi table. #completed
2. It send an email as a confirm to user that the table is updated whenever we run the cap service 
3. the service would be scheduled as a background job in btp to refresh the hdi table with latest data available on external source



btp scheduler service ---> cap service --> requesting for token against client id and secret provided to it via binding
security mechanism as dummy ---> it will make all authentication checks as true