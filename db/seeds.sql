INSERT INTO department (name)
VALUES ("Accounting"),
       ("HR"),
       ("Sales"),
       ("Production"),
       ("Shipping");

SELECT * FROM employee_db.department;

INSERT INTO roles (title, salary, department_id)
VALUES ("CFO", 600000.00, 1),
       ("Shipping Coordinator", 87000.00, 5),
       ("HR Manager", 97000.00, 2),
       ("Head Accountant", 102000.00, 1),
       ("Production Manager", 72000.00, 4);

SELECT * FROM employee_db.role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Smith", 1, null),
       ("Jen", "Black", 2, 5),
       ("Dave", "Johnson", 3, null),
       ("Mary", "James", 4, null),
       ("Fred", "Vero", 5, null);
       
SELECT * FROM employee_db.employee;