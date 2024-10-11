// models/Professor.js
export class Professor {
    constructor(
        professorname = '',
        professorid = 'empty',
        email = '',
        degreecompleted = '',
        institutionname = '',
        department = '',
        experience = '',
        gender = '',
        mobile = '',
        password = '',
        status = 'false'
    ) {
        this.professorname = professorname;
        this.professorid = professorid;
        this.email = email;
        this.degreecompleted = degreecompleted;
        this.institutionname = institutionname;
        this.department = department;
        this.experience = experience;
        this.gender = gender;
        this.mobile = mobile;
        this.password = password;
        this.status = status;
    }
}
