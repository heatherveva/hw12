const inquirer = require("inquirer");
const mysql = require("mysql2");
// const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the employee_db database.")
);

function chooseAction(initialOptions) {
  let choice;

  switch (initialOptions) {
    case "View all departments":
      choice = viewDepartments();
      break;
    case "View all roles":
      choice = viewRoles();
      break;
    case "View all employees":
      choice = viewEmployees();
      break;
    case "Add a department":
      choice = addDepartments();
      break;
    case "Add a role":
      choice = addRole();
      break;
    case "Add an employee":
      choice = addEmployee();
      break;
    case "Update an employee role":
      choice = updateEmployee();
      break;
    case "Quit":
      choice = quit();
      break;
  }

  inquirer
    .prompt({
      name: "initialOptions",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
      loop: false,
    })
    .then((answer) => {
      chooseAction(answer.choice);
    })
    .catch((err) => {
      console.log(err);
    });
}

//functions will execute action in mySQL    
function viewDepartments()
function viewRoles()
function viewEmployees()
function addDepartments()
function addRole()
function addEmployee()
function updateEmployee()
function quit()

chooseAction(choice);
