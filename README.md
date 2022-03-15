# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This employee database and record system allows a user to view employee records, roles, and department information for a company.

When a user enters the system, they are prompted with a list of action options.

If they click to view departments, they are presented with a table of departments and the department's id number.

If they like view roles, they are presented with a table of roles and the role's id number, title, salary, and department id.

If they like view employees, they are presented with a table of employees and the employees's id number, first name, last name, role id, and manager id, when applicable.

The schema for each table is set up so each table has a primary key and a foreign key, which relates one table to another within the employee database.

If the user selects add a role, they are presented with a series of prompts, and the added information is added into the existing roles table.

If the user selects add an employee, they are presented with a series of prompts, and the added information is added into the existing employee table.

If the user selects add a department, they are presented with a prompt, and the added information is added into the existing department table.

If the user selects update an employee, they are presented with a prompt to select an employee id, then a role id, then the employee table is displayed with updated role id.

If the user selects to delete an employee, they are asked what the employees id number is, then the employee matching that id is deleted.

When the user is done using the application, they can select the quit option to quit the application. They will receive a brief sign off message upon selection of the quit option.

## Installation

This application requires Node.js, Inquirer, dotenv (to hide sensitive database credentials), and MySQL.

## Walkthrough

Walkthrough Link: https://www.loom.com/share/cfd9735147ff4a348a24cbb1670576e2

## License

This application is covered under an MIT License.

## Contact Me

GitHub: https://github.com/heatherveva

Email: heatherveva@gmail.com

## Links

GitHub Repository: https://github.com/heatherveva/hw12.git

GitHub Page: https://heatherveva.github.io/hw12/
