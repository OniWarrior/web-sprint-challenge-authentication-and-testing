const db = require('../../data/dbConfig')

function findById(id){
    return db('users')
           .where('id',id)
           .first()
}

function insert(user){
    return db('users')
           .insert(user)
           .then(([id])=>findById(id))
}

function findByUserName(username){
    return db('users')
           .where("username",username)
           
}



function findByPassword(password){
    return db('users')
           .where("password",password)
}

module.exports={
    findById,
    findByUserName,
    findByPassword,
    insert
    
}