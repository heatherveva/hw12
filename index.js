const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// connect to the server
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the employee_db database.")
);

// inquirier prompt to give user options to access/use the database
function init() {
  inquirer
    .prompt([
      {
        name: "list",
        type: "list",
        choices: [
          {
            name: "View all employees.",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View all departments.",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "View all roles.",
            value: "VIEW_ROLES",
          },
          {
            name: "Add an employee.",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Add a role.",
            value: "ADD_ROLES",
          },
          {
            name: "Add a department.",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Update an employee role.",
            value: "UPDATE_EMPLOYEE",
          },
          {
            name: "Delete an employee.",
            value: "DELETE_EMPLOYEE",
          },

          {
            name: "Quit.",
            value: "QUIT",
          },
        ],
        message: "What would you like to do?",
      },
    ])
    .then((answers) => {
      if (answers.list === "VIEW_EMPLOYEES") {
        viewEmployees();
      } else if (answers.list === "VIEW_DEPARTMENTS") {
        viewDepartments();
      } else if (answers.list === "VIEW_ROLES") {
        viewRoles();
      } else if (answers.list === "ADD_EMPLOYEE") {
        createEmployee();
      } else if (answers.list === "ADD_ROLES") {
        createRole();
      } else if (answers.list === "ADD_DEPARTMENT") {
        addDepartment();
      } else if (answers.list === "UPDATE_EMPLOYEE") {
        updateEmployee();
      } else if (answers.list === "DELETE_EMPLOYEE") {
        deleteEmployee();
      } else if (answers.list === "QUIT") {
        quit();
      }
    });
}

// displays the employee table from the database
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
  init();
}

// displays the department table from the database
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
  init();
}

// displays the roles table from the database
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
  });
  init();
}

// prompts the user to input new employee info and adds it to the database
function createEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What's the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What's the employee's last name?",
      },
    ])
    .then((answers) => {
      db.query("SELECT * FROM roles", function (err, results) {
        const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: roles,
          })
          .then((role) => {
            db.query(
              "SELECT * FROM employee where manager_id is null",
              function (err, results) {
                const managers = results.map(({ id, last_name }) => ({
                  name: last_name,
                  value: id,
                }));
                inquirer
                  .prompt({
                    type: "list",
                    name: "id",
                    message: "What is the manager's name?",
                    choices: managers,
                  })
                  .then((manager) => {
                    db.query(
                      "INSERT INTO employee(first_name, last_name, role_id, manager_id) values(?,?,?,?)",
                      [answers.firstName, answers.lastName, role.id, manager.id]
                    );
                    init();
                  });
              }
            );
          });
      });
    });
}

// prompts the user to input new role info and adds it to the database
function createRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is this role's salary?",
      },
    ])
    .then((answers) => {
      db.query("SELECT * FROM roles", function (err, results) {
        const departments = results.map(({ id, department_id }) => ({
          name: department_id,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the department id for this role?",
            choices: departments,
          })
          .then((department) => {
            db.query(
              "INSERT INTO roles(title, salary, department_id) values(?,?,?)",
              [answers.title, parseInt(answers.salary), department.id]
            );
            init();
          });
      });
    });
}

// prompts the user to input new department info and adds it to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO department(name) values(?)", [answers.name]);

      init();
    });
}

function updateEmployee() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    const employees = results.map(({ id }) => ({
      name: id,
    }));
    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employees,
      })
      .then((employee) => {
        db.query("SELECT * FROM roles", function (err, results) {
          const roles = results.map(({ id, role_id }) => ({
            name: role_id,
            value: id,
          }));
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Please enter the employye's new role id.",
              choices: roles,
            })
            .then((role) => {
              db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                role.id,
                employee.id,
              ]);
              db.query("SELECT * FROM employee", (err, results) => {
                console.table(results);
                init();
              });
            });
        });
      });
  });
}

function deleteEmployee() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    const employees = results.map(({ id }) => ({
      name: id,
    }));
    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: employees,
      })
      .then((employee) => {
        db.query("DELETE from employee WHERE id = ?", [employee.id]);
        init();
      });
  });
}

function quit() {
  console.log("Thank you for viewing the company database.");
}

init();
