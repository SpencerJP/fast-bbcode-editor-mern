import mysql from 'mysql'

export default class MySQLConnection {

    constructor(host, user, password, db) {
        this.host = host
        this.user = user
        this.password = password
        this.db = db
    }

    testConnection() {
        const conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            db: this.db
        });
        conn.connect(function (err) {
            if (err) throw err;
        });
        conn.end()
    }

    query(query) {
        let result
        const conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            db: this.db
        });
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sqlStatement, function (err, response) {
                if (err) throw err;
                result = response
            });
        });
        conn.end()
        return result
    }

    // executeStatement(sqlStatement) {
    //     let result
    //     const conn = mysql.createConnection({
    //         host: this.host,
    //         user: this.user,
    //         password: this.password,
    //         db: this.db
    //     });
    //     conn.connect(function (err) {
    //         if (err) throw err;
    //         conn.query(sqlStatement, function (err, response) {
    //             if (err) throw err;
    //             result = response
    //         });
    //     });
    //     conn.end()
    //     return result
    // }


}