const connections = require("./db.js");

const express = require("express");
const app = express();
app.use(express.json());

// console.log(connections)

// const sql=`drop table movies`

// const sql = `create table node.movies (name varchar(25),hero varchar(30),collection int,duration varchar(10));`;

// connections.query(sql, (err, res) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("successfully executed", res);
//   }
// });

// let sql=`select * from users`

// connections.query(sql,(err,res)=>{
//     if(err){
//         throw err
//     }
//     else{
//         console.log("successfu/",res)
//     }
// })

app.get("/getusers", (req, res) => {
  let sql = `select * from users`;

  connections.query(sql, (err, result) => {
    if (err) {
    //   throw err;
      res.send("failed to get users");
    } else {
      //   console.log("successfu/", res);
      res.send(result);
    }
  });
});


app.post("/login",(req,res)=>{
    let user_email=req.body.email
    let user_pass=req.body.password
    let sql=`select * from users where email="${user_email}" and password="${user_pass}"`
    connections.query(sql,(err,result)=>{
        if(err){
            res.send("error")

        }
        else{
            // res.send(result)
            if(result.length>0){
                res.send("login success")
            }
            else{
                res.send("inavalid")
            }
        }
    })
})




app.listen(3000, () => {
  console.log("server has been running");
});
