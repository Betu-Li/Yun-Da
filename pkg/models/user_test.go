package models

import (
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"testing"
)

func TestCreateUser(t *testing.T) {
	mockDB, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer mockDB.Close()

	sqlxDB := sqlx.NewDb(mockDB, "sqlmock")

	user := &User{
		Username: "test",
		Password: "test",
	}

	mock.ExpectExec("insert into user").WithArgs(user.Username, user.Password).
		WillReturnResult(sqlmock.NewResult(1, 1))

	if err := CreateUser(sqlxDB, user); err != nil {
		t.Errorf("error was not expected while updating stats: %s", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}

func TestGetUserByUsername(t *testing.T) {
	mockDB, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer mockDB.Close()

	sqlxDB := sqlx.NewDb(mockDB, "sqlmock")

	username := "test"
	rows := sqlmock.NewRows([]string{"username"}).AddRow(username)

	mock.ExpectQuery("select username from user").WithArgs(username).WillReturnRows(rows)

	if _, err := GetUserByUsername(sqlxDB, username); err != nil {
		t.Errorf("error was not expected while getting user: %s", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}
