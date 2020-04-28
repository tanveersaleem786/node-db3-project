const db = require("../data/config")

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes").where("id",id).first()
} 

function findSteps(id) {
    return db("schemes as s")
          .join("steps as st", "s.id", "st.scheme_id")
          .where("s.id",id)
          .select("st.id", "s.scheme_name","st.step_number", "st.instructions")
}

function add(scheme) {
    return  db("schemes")
     .insert(scheme)
     .then(([id]) => findById(id))    
}

function update(scheme,id) {
    return  db("schemes")
     .update(scheme)
     .where("id",id)
     .then(count => count > 0 ? findById(id) :  null)     
}

function remove(id) {
    return db("schemes")
    .where("id",id)
    .del()  
   // .then(count => count > 0 ? findById(id) : null) 
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}