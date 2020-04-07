CREATE DATABASE IF NO EXISTS empresa;

USE empresa;

CREATE TABLE empleado(
    id INT (11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    SALARY INT (11) DEFAULT NULL,
    PRIMARY KEY (id)
);
DESCRIBE empleado;

CREATE DEFINER=`root`@`localhost` PROCEDURE `empleadoaddoredit`(
    IN _id INT,
    IN _name VARCHAR(45),
    IN _salary INT
)
BEGIN 
    IF _id = 0 THEN 
        INSERT INTO empleado (name,salary)
        VALUES (_name, _salary);
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE empleado
        SET
            name=_name,
            salary=_salary
            WHERE id=_id;
    END IF;

    SELECT _id AS id;
END