import * as mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { Patient } from './domain/patient';
import { processFile } from './helpers';
import { Email } from './domain/email';

(async () => {
    await mongoose.connect(`mongodb://mongodb:27017/`, {
        useNewUrlParser: true,
        dbName: 'doit-test',
        useUnifiedTopology: true,
    });
    try {
        const patientModel = getModelForClass(Patient);
        const emailModel = getModelForClass(Email);
        const [, ...data] = await processFile(`${__dirname}/../data.csv`);
        for (const record of data) {
            if (record.length !== 16) {
                throw new Error('Invalid data!');
            }
            const update_data = new Date();
            const patient: Patient = {
                program_identifier: record[0],
                data_source: record[1],
                card_number: record[2],
                member_id: record[3],
                first_name: record[4],
                last_name: record[5],
                date_of_birth: record[6],
                address_1: record[7],
                address_2: record[8],
                city: record[9],
                state: record[10],
                zip_code: record[11],
                telephone_number: record[12],
                email_address: record[13],
                consent: record[14],
                mobile_phone: record[15],
                last_update: update_data,
            };
            const patientDoc = await patientModel.findOneAndUpdate({
                card_number: patient.card_number,
                member_id: patient.member_id
            }, patient, { upsert: true, useFindAndModify: false, }).exec();
            
            if (patientDoc.consent === 'Y') {
                // Remove all emails from previous load, not enough clear is it need.
                await emailModel.deleteMany({ patient: patientDoc });

                for (const day of [1, 2, 3, 4, 5]) {
                    const dateInMs: number = update_data.valueOf() + (24 * 60 * 60 * 1000 * day);
                    const email: Email = {
                        name: `Day ${day}`,
                        patient: patientDoc,
                        schedule_date: new Date(dateInMs),
                    };
                    await emailModel.create(email);
                }
            }
        }
    } finally {
        await mongoose.disconnect();
    }
})();