const { Pool} = require('pg')

try{
  const cs = require("./../connect_string.js");
}
catch(){
  cs = null;
}  

const pool = new Pool({
  // quando local usar a url fornecida pelo heroku
  // ao subir e testar no heroku usar o colocado no heroku
  connectionString: process.env.DATABASE_URL || cs.connectionString(),   
  ssl: {
        rejectUnauthorized: false
  }
})


async function selectData(res1, conn) {
    try {
      const res3 = await conn.query('SELECT * FROM ds403;', (err, res) => {
          if (err) {
              console.log("Error - Failed to select all from Users");
              console.log(err);
          }
          else{            
              resp = res.rows
              console.log(resp);
              res1.status(200).send(res.rows);
              return resp;
          }
      });
      
    } catch (error) {
      console.error(error)
    }
  }

  async function connect() {
      if (global.connection)
          return global.connection.connect();
   /*
      const { Pool } = require('pg');
      const pool = new Pool({
          connectionString: 'postgres://fyazuind:r34WG7VcdfJvN4WplbWYHEk-hfyYELv1@isilo.db.elephantsql.com:5432/fyazuind'
      });
   */
     
      //apenas testando a conexão
      const client = await pool.connect();
      console.log("Criou pool de conexões no PostgreSQL!");
   
      const res = await client.query('SELECT NOW()');
      console.log(res.rows[0]);
      client.release();
   
      //guardando para usar sempre o mesmo
      global.connection = pool;
      return pool.connect();
  }


module.exports = { selectData, connect };