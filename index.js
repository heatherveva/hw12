const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
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
    let actionChoice;
  
switch (initialOptions)
{
    case "View all departments":
        actionChoice = viewDepartments();
        break;
    case  "View all roles":
        actionChoice = viewRoles();
        break;
    case "View all employees":
        actionChoice = viewEmployees();
        break;
    case "Add a department":
        actionChoice = addDepartments();
        break;
    case "Add a role":
        actionChoice = addRole();
        break;
    case "Add an employee":
        actionChoice = addEmployee();
        break;
    case "Update an employee role":
    actionChoice = updateEmployee();
        break;
}

inquirer
  .prompt(
      {
    name: "initialOptions",
    type: "list",
    message: "What would you like to do today?",
    choices: [
        {name: "View all departments", value: "viewDepartments"}, 
        {name: "View all roles", value: "viewRoles"}, 
        {name: "View all employees", value: "addDepartments" }, 
        {name: "Add a department", value: "addDepartments"}, 
        {name: "Add a role", value: "addRole"}, 
        {name: "Add an employee", value: "addEmployee"}, 
        {name: "Update an employee role", value: "updateEmployee" }, 
        {name: "Quit", value: "quit"} ]
  }
    )
  


