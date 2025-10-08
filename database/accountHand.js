const mysql = require("promise-mysql");
const config = require("./config.json");

async function createAccount(email, user_name, password) {
    let db = await mysql.createConnection(config);

    const dbQuestion = `
    INSERT INTO
        Users
    (
        email,
        user_name,
        password
    )
    VALUES
    (
        ?,
        ?,
        ?
    )
    ;`;

    try 
    {
        await db.query(dbQuestion, [email, user_name, password]);
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            throw new Error("DUPLICATE_ACC");
        }
    }

    db.end();
}

async function loginToAccount(user_name, password) {
    let db = await mysql.createConnection(config);

    const dbQuestion = `
    SELECT * 
    FROM 
        Users
    WHERE 
        user_name = ?
    AND
        password = ?
    ;
    `;

    const [rows] = await db.query(dbQuestion, [user_name, password]);

    if(rows.length === 0){
        db.end;
        throw new Error("INVALID_LOGIN");
    }

    let userID = rows.user_id;

    return userID;

}

module.exports = {
    "createAccount" : createAccount,
    "loginToAccount" : loginToAccount
}