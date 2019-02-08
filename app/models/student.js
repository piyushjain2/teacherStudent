import {_} from 'lodash'
import db from '../db'
import schemas from '../config/schema'
import config from '../config/config'
import UfinityError from './customerror';


export default class Student {
    constructor(data) {
        this.data = this.clean(data);
    }

    clean(data) {
        // Sanitizing our object
        data = data || {};
        let schema = schemas.students;
        return _.pick(_.defaults(data, schema), _.keys(schema));
    }

    static async getInstance(mail){
        try{
            // Check if existing student
            return await Student.findByMail(mail);
        } catch(error) {
            // Create new student instance
            let studentData = {}
            studentData[schemas.students.mail] = mail
            let studentInstance = new Student(studentData)
            studentInstance.data[schemas.students.id] = await studentInstance.save();
            return studentInstance;
        }
    }

    save(){
        let db_cn = new db();
        return new Promise((resolve, reject)=>{
            db_cn.insert(config.tables.student)
                .execute([schemas.students.mail, this.data[schemas.students.mail]],
                     function(err, res){
                        if (err) return reject(err);
                        resolve(res.insertId);
                    })
                });
        }

    async suspend(suspend) {
        // Suspend student
        let db_cn = new db();
        this.data[schemas.students.isSuspended] = suspend;
        return await new Promise( (resolve, reject) =>{
            db_cn.update(config.tables.student, schemas.students['isSuspended'], true)
                .where()
                .execute( [`${schemas.students.mail}`, `${this.data[schemas.students.mail]}`],
                        (error, result)=>{
                            if (error){
                                return reject(error);
                            }
                            resolve(result)
                        });
        });
    }

    static findByMail(mailId) {
        // Returns a Student object
        return new Promise((resolve, reject)=>{
            let db_cn = new db();
            db_cn.findByAttribute(config.tables.student, schemas.students.mail)
                    .execute([mailId], (err, data) => {
                        if (err){
                            return reject(err);                        
                        }
                        if (data.length < 1) {           
                            return reject(new UfinityError('Student '+mailId+' does not exist.'));
                        }
                        let sInstance = new Student(data[0]);
                        resolve(sInstance);
                    });
        });
    }
}