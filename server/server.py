from string import Template
from flask import Flask, g
import sqlite3

app = Flask(__name__)

DATABASE = "database/database.db"

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


@app.route("/")
def hello_word():
    db = get_db()
    cur = db.execute("SELECT id from users")
    userIds = cur.fetchall()
    message = ""
    for userId in userIds:
        template = Template('<p>ID: $id</p><br>')
        message = message + template.substitute(id = userId)
    return message
