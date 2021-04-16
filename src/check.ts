import * as mongoose from 'mongoose';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { Patient } from './domain/patient';
import { processFile } from './helpers';
import { Email } from './domain/email';

const checkIsDataFromFileTheSameInDB = async () => {
    let problemsCount = 0;
    const patientModel = getModelForClass(Patient);
    const [, ...data] = await processFile(`${__dirname}/../data.csv`);
    for (const record of data) {
        if (record.length !== 16) {
            throw new Error('Invalid data!');
        }
        const patient = {
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
        };
        const patientDoc = await patientModel.findOne({
            card_number: patient.card_number,
            member_id: patient.member_id
        }).exec();
        if (!patientDoc) {
            problemsCount += 1;
            console.error(`No patient in DB with card_number: ${patient.card_number} and member_id: ${patient.member_id}`);
            continue;
        }
        
        for (const key of Object.keys(patient)) {
            if (patientDoc[key] !== patient[key]) {
                problemsCount += 1;
                console.error(`Invalid data for patient ${patientDoc._id.toString()}. '${key}' should be '${patient[key]}', but have '${patientDoc[key]}'`);
            }
        }
    }
    console.log(`Finished checking patients from file. Problems found: ${problemsCount}`);
}

const checkPatientsWithEmptyName = async () => {
    const patientModel = getModelForClass(Patient);
    const patients = await patientModel.find({ $or: [
        { first_name: '' },
        { first_name: { $exists: false } }
    ] }).exec();
    if (patients.length > 0) {
        console.log(`Patients with empty first_name: ${patients.map(patient => patient._id.toString()).join(', ')}`);
    } else {
        console.log('No patients with empty first_name');
    }
}

const checkPatientsWithConsentYButEmptyEmail = async () => {
    const patientModel = getModelForClass(Patient);
    const patients = await patientModel.find({ $or: [
        { email_address: '' },
        { email_address: { $exists: false } }
    ], consent: 'Y' }).exec();
    if (patients.length > 0) {
        console.log(`Patients with consent Y and empty email: ${patients.map(patient => patient._id.toString()).join(', ')}`);
    } else {
        console.log('No patients with consent Y and empty email');
    }
} 

const checkEmails = async () => {
    const patientModel = getModelForClass(Patient);
    const emailModel = getModelForClass(Email);
    const patientsWithConsentY = await patientModel.find({
        consent: 'Y'
    }).exec();
    const patientsWithoutConsentY = await patientModel.find({
        consent: { $ne: 'Y' }
    }).exec();
    const wrongEmails = await emailModel.find({ patient: { $in: patientsWithoutConsentY.map(patient => patient._id) } });
    if (wrongEmails.length > 0) {
        for (const email of wrongEmails) {
            console.log(`Email for patient ${email.patient} shouldn't be created`);
        }
    }

    for (const patient of patientsWithConsentY) {
        const emails = await emailModel.find({ patient }).exec();
        if (emails.length !== 5) {
            console.log(`For patient ${patient._id.toString()} created only ${emails.length} emails`);
        }
        for (const email of emails) {
            const day = Number.parseInt(email.name.replace(/Day /g, ''));
            if (!Number.isInteger(day)) {
                console.log(`Invalid name for email ${email._id.toString()}`);
                continue;
            }
            const expectedDate = patient.last_update.valueOf() + (24 * 60 * 60 * 1000 * day);
            if (expectedDate !== email.schedule_date.valueOf()) {
                console.log(`Invalid schedule_date for ${email._id.toString()}. Should be '${expectedDate}', but have '${email.schedule_date.valueOf()}'`);
            }
        }
    }
} 

(async () => {
    await mongoose.connect(`mongodb://mongodb:27017/`, {
        useNewUrlParser: true,
        dbName: 'doit-test',
        useUnifiedTopology: true,
    });
    try {
        await checkIsDataFromFileTheSameInDB();
        await checkPatientsWithEmptyName();
        await checkPatientsWithConsentYButEmptyEmail();
        await checkEmails();
    } finally {
        await mongoose.disconnect();
    }
})();