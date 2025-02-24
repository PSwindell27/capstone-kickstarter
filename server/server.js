import express from "express";
import postgres from "postgres";
import nodemon from "nodemon";
import cors from "cors";
import dotenv from "dotenv";

// const sql = postgres({
//   database: "kickstarter",
//   username: "postgres",
//   password: "password",
// });

dotenv.config();
// {path: "../.env"}
const sql = postgres(process.env.DATABASE_URL);

// const sql = postgres("postgres://localhost/kickstarter");
const app = express();

//=============Middleware=======================================
app.use(express.json());
app.use(express.static("./client"));
app.use(cors());

//==============Routes====================================

app.get("/api/projects", (req, res) => {
  sql`SELECT * FROM projects`.then((results) => {
    res.send(results);
  });
  console.log("is working");
});

app.get("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  sql`SELECT * FROM projects WHERE id = ${id}`.then((results) => {
    if (results.length !== 0) {
      res.json(results[0]);
    } else {
      res.status(404);
      res.set("Content-Type", "text/plain");
      res.send("Not Found");
    }
  });
});

//==============campaign Routes====================================

app.get("/api/campaign", (req, res) => {
  sql`SELECT * FROM campaign`.then((results) => {
    res.send(results);
  });
  console.log("is working");
});

app.get("/api/campaign/:id", (req, res) => {
  const id = req.params.id;
  sql`SELECT * FROM campaign WHERE project_id = ${id}`.then((results) => {
    if (results.length !== 0) {
      res.json(results[0]);
    } else {
      res.status(404);
      res.set("Content-Type", "text/plain");
      res.send("Not Found");
    }
  });
});

app.get("/api/pledge", (req, res) => {
  sql`SELECT * FROM pledge`.then((results) => {
    res.send(results);
  });
  console.log("is working");
});



//============== creator Routes====================================

app.get("/api/creator", (req, res) => {
  sql`SELECT * FROM creator`.then((results) => {
    res.send(results);
  });
  console.log("is working");
});

app.get("/api/creator/:id", (req, res) => {
  const { project_id } = req.params;
  sql`SELECT * FROM creator WHERE project_id = ${project_id}`.then(
    (results) => {
      if (results.length !== 0) {
        res.json(results[0]);
      } else {
        res.status(404);
        res.set("Content-Type", "text/plain");
        res.send("Not Found");
      }
    }
  );
});

//===================================COMMENTS===============================
app.get("/api/comments", (req, res) => {
  sql`SELECT * FROM comments`.then((results) => {
    res.send(results);
  });
  console.log("is working");
});

//==============ERROR HANDLERS==============================================
app.use((err, req, res, mext) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is running");
});
