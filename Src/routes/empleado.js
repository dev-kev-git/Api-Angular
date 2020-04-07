const express = require ('express'); 
const router = express.Router();

const mysqlConnection = require ('../databse');

router.get('/' , (req,res)=>{
    mysqlConnection.query('SELECT*FROM empleado',(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT*FROM empleado WHERE id = ?', [id],(err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/',(req, res)=>{
    const {id, name, salary}=req.body;
    console.log(req.body)
    const query= `CALL empleadoaddoredit (?,?,?);`;
    
    mysqlConnection.query(query , [id, name, salary], (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Empleado guardado'});
        }else{
            console.log(err);
        }
    });
});


router.put ('/:id', (req, res)=>{
    const {name,salary}=req.body;
    const { id } = req.params;

    const query = 'CALL empleadoaddoredit (?,?,?);';
    mysqlConnection.query(query , [id, name, salary], (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Empleado actualizado'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM empleado WHERE id=?',[id],(err, rows, fields)=>{
        if(!err){
            res.json({Status:'Empleado eliminado'});
        }else{
            console.log(err);
        }
    });
});

module.exports=router;