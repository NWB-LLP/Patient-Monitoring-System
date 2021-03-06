const db = require('../database/postgres');

const PatientRepo = {};

/*
    Different types of id supported =>
    1) phone_number
    2) adhar_number
    3) driving_license
    4) pan
*/

PatientRepo.registerPatient = async function(patient, patientInfo, patientVitals){
    const res = await db.query(`insert into patient(employee_uid, name, age, gender,
         avpu, severity) values($1, $2, $3, $4, $5, $6) 
         returning uid;`, [patient.employeeUid, patient.name, patient.age,
        patient.gender, patient.avpu, patient.severity]);

    const patientUid = res.rows[0].uid;

    await db.query(`insert into patient_id(patient_uid, id_value, id_type) 
    select $1, $2, id from id_types where
        type = $3`,
        [patientUid, patientInfo.id, patientInfo.idType]);

    await db.query(`insert into patient_vitals(patient_uid, bp, temperature, 
        pulse, pain, respiratory_rate, cbg, spo2) values
        ($1, $2, $3, $4, $5, $6, $7, $8);`, 
        [patientUid, patientVitals.bp, patientVitals.temperature, patientVitals.pulse,
        patientVitals.pain, patientVitals.respiratoryRate, patientVitals.cbg, patientVitals.spo2]);

    return patientUid;
}

module.exports = PatientRepo;