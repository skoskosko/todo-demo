
-- -----------------------------------------------------
-- Table `user`
-- Can be easily extended with openid field to use with authentication.
-- -----------------------------------------------------
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64),
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
)
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `note`
-- Can be easily extended with wall_id foreign key to support multiple walls
-- -----------------------------------------------------
CREATE TABLE `note` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL DEFAULT 'New Note',
  `text` TEXT NULL DEFAULT NULL,
  `assigned_to` INT,
  `after` INT,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_assignee_on_note`
    FOREIGN KEY (`assigned_to`)
    REFERENCES `user` (`id`),
  CONSTRAINT `FK_note_before_note`
    FOREIGN KEY (`after`)
    REFERENCES `note` (`id`)
)
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;