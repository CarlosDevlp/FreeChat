var mysql = require('mysql');
Dao={
   connection: mysql.createConnection({
                  host: 'localhost',
                  user: 'local',
                  password: '123456789123456789',
                  database: 'FREECHAT' 
               }),
   result:undefined,
   init:function(){
      this.connection.connect(function(error){
               if(error)
                  console.log('Error');
               else
                  console.log('Conexion correcta.');
   
      });
      
   },
   finish:function(){
      this.connection.end();
   }
   ,
   select: function(callback){
        
         this.connection.query("SELECT EMISOR,MSJ FROM MENSAJE", function(error, result,fields){
                              if(error)
                                    throw error;
                              else{

                                    if(result.length > 0)
                                       callback(result);
                                    else
                                       console.log('Registro no encontrado');
                           
                              }

                  });               
   },
   insert:function(emisor,msj){
                                
         this.connection.query("INSERT INTO MENSAJE (EMISOR,MSJ) VALUES( '"+emisor+"' , '"+msj+"' )",function(error){
                              if(error)
                                 throw error;
                              else
                                 console.log("insercion correcto");
                              
                  });
   }  
};
Dao.init();
//Dao.init();
//Dao.select(function(result){Dao.result=result;console.log(Dao.result);});
//Dao.finish();

/*
   Creado por: Carlos Chavez Laguna.
               
*/

