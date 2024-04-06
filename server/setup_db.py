import sqlite3

DATABASE = "database/database.db"

def setup_db():
    connection = sqlite3.connect(DATABASE)
    with open("database/init_db.sql", "r") as sql_file:
        try:
            connection.executescript(sql_file.read())
        except:
            print("Error executing file")
    connection.close()

if __name__ == "__main__":
    setup_db()
    