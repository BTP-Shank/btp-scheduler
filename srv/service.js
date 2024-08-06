const cds = require('@sap/cds');
const nodemailer = require('nodemailer');

class CatalogService extends cds.ApplicationService {

    async init() {

        const { Invoices, LiveData } = this.entities;

        this.on('refreshDB', async (req) => {

            let query = {
                SELECT: { from: { ref: ["CatalogService.Inv"] }, orderBy: [["OrderID"]] }
            };

            //Read invoices
            let connInvoice = await cds.connect.to("Northdata");
            let invresp = await connInvoice.tx(req).run(query);

            //Create a payload to save in db
            let payload = {
                datadump: JSON.stringify(invresp?.value),
                username: req.data.user
            }

            // Save inside the database
            let dbConn = await cds.connect.to('db');
            let tx = await dbConn.transaction(req);
            let respDB = await tx.run(INSERT.into(LiveData).entries(payload));


            // Send completion email to end user
            // Create a transporter object using Gmail SMTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shashank968246@gmail.com',
                    pass: 'xrrm lmxq xoyz yryq'
                }
            });

            // Email options
            const mailOptions = {
                from: 'shashank968246@gmail.com',
                to: 'ohavtest153@gmail.com',
                subject: 'Database updated with New dataset from NorthWind',
                text: 'Hi Team , /n New dump from NorthWind portal updated in the database. /n Thanks, Processing team'
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('❌ Error:', error.message);
                } else {
                    console.log('✅ Email sent:', info.response);
                }
            });

        return {
            "message" : "Refresh successful by user" + req.data.user
        };

        });

        await super.init();
    }
}

module.exports = { CatalogService };