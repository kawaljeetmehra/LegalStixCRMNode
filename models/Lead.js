const db = require('../database/db');

const createLead = (requestBody, ip_address, callback) => {

      const sql = `INSERT INTO leads 
        (first_name, middle_name, last_name, gender, email, phoneNo, qualification, 
        father_name, father_phoneNo, mother_name, mother_phoneNo, aadhar_number, pan_number, 
        country_id, state_id, city_id, category_id, stage, eligibility, book_counselling, 
        source, appointment_date, remarks, created_by, updated_by, location, status, created_at, follow_up, ip_address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`;
      
      const values = [
        requestBody.first_name,
        requestBody.middle_name,
        requestBody.last_name,
        requestBody.gender,
        requestBody.email,
        requestBody.phoneNo,
        requestBody.qualification,
        requestBody.father_name,
        requestBody.father_phoneNo,
        requestBody.mother_name,
        requestBody.mother_phoneNo,
        requestBody.aadhar_number,
        requestBody.pan_number,
        requestBody.country_id,
        requestBody.state_id,
        requestBody.city_id,
        requestBody.category_id,
        requestBody.stage,
        requestBody.eligibility,
        requestBody.book_counselling,
        requestBody.source,
        requestBody.appointment_date,
        requestBody.remarks,
        requestBody.created_by,
        requestBody.updated_by,
        requestBody.location,
        requestBody.status,
        requestBody.follow_up,
      ];

    db.query(sql, [...values, ip_address], (err, results) => {
          if(err) return callback(err, null);
          return callback(null, results);
    })
}


const updateLead = (requestBody, ip_address, callback) => {
  const values = [
      requestBody.first_name,
      requestBody.middle_name,
      requestBody.last_name,
      requestBody.gender,
      requestBody.email,
      requestBody.phoneNo,
      requestBody.qualification,
      requestBody.father_name,
      requestBody.father_phoneNo,
      requestBody.mother_name,
      requestBody.mother_phoneNo,
      requestBody.aadhar_number,
      requestBody.pan_number,
      requestBody.country_id,
      requestBody.state_id,
      requestBody.city_id,
      requestBody.category_id,
      requestBody.stage,
      requestBody.eligibility,
      requestBody.book_counselling,
      requestBody.source,
      requestBody.appointment_date,
      requestBody.remarks,
      requestBody.created_by,
      requestBody.updated_by,
      requestBody.location,
      requestBody.status,
  ];

  const sql = `
          UPDATE leads
          SET
            first_name = ?,
            middle_name = ?,
            last_name = ?,
            gender = ?,
            email = ?,
            phoneNo = ?,
            qualification = ?,
            father_name = ?,
            father_phoneNo = ?,
            mother_name = ?,
            mother_phoneNo = ?,
            aadhar_number = ?,
            pan_number = ?,
            country_id = ?,
            state_id = ?,
            city_id = ?,
            category_id = ?,
            stage = ?,
            eligibility = ?,
            book_counselling = ?,
            source = ?,
            appointment_date = ?,
            remarks = ?,
            created_by = ?,
            updated_by = ?,
            location = ?,
            status = ?,
            ip_address = ?,
            follow_up = ?
          WHERE RecordID = ?`;

    db.query(sql, [...values, ip_address ,requestBody.follow_up, requestBody.RecordID], (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}


const deleteLead = (requestBody, callback) => {
     const sql = `delete from leads WHERE RecordID = ?`;

     db.query(sql, [requestBody.RecordID], (err, results) => {
          if(err) return callback(err, null);
          return callback(null, results);
     })
}


const fetchLead = (requestBody, callback) => {
  const { monthID, year} = requestBody;
  
  let sqlStr ='';
  if(year > 0 && monthID > 0){
        sqlStr+=` WHERE YEAR(created_at) = '${year}'  AND MONTH(created_at) = '${monthID}'`;
  }else if(monthID > 0){
        sqlStr+=` WHERE MONTH(created_at) = ${monthID}`;
  }else if(year > 0){
        sqlStr+=` WHERE YEAR(created_at) = ${year}`;
  }

  const sql = `select * from leads ${sqlStr}`;
  //  console.log(sql)
  db.query(sql, (err, results) => {
       if(err) return callback(err, null);
       return callback(null,  results);
  })
}


const getleads = (callback) => {
  const sql = `select * from leads`;

  db.query(sql, (err, results) => {
       if(err) return callback(err, null);
       return callback(null,  results);
  })
}


module.exports = {createLead, updateLead, deleteLead, fetchLead, getleads}