import express from "express";
import mysql from "mysql";

const app = express();
// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodemysql",
});
// connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected....");
});
// create database
app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("database created...");
  });
});
// create table
app.get("/createPostTable", (req, res) => {
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Table posts created...");
  });
});
// insert row into table
app.get("/insertPost", (req, res) => {
  let post = { title: "Third Post", body: "Body of post 2" };
  let sql = "insert into posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("post inserted...");
  });
});
//fetch rows
app.get("/fetchPost", (req, res) => {
  let sql = "select * from posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts fetched");
  });
});
// fetch selective rows
app.get("/fetchPost/:id", (req, res) => {
  let sql = `select * from posts where id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts fetched with this id");
  });
});
// update rows
app.get("/updatePost/:id", (req, res) => {
  let updatedPostData = { title: "Updated Title" };
  let sql = `update posts set title='${updatedPostData.title}' where id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post is updated with this id");
  });
});
// delete rows
app.get("/deletePost/:id", (req, res) => {
  let sql = `delete from posts where id=${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post deleted with this id");
  });
});
app.listen("5000", () => {
  console.log("server is running on port 5000");
});
// create table
