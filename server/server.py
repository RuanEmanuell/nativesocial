from string import Template
from flask import Flask, g, jsonify, request
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
def get_posts():
    db = get_db()
    query = db.execute("SELECT postContent from posts")
    posts = query.fetchall()
    all_posts = []
    for post in posts:
        all_posts.append(post)
    return jsonify(all_posts)

@app.route("/post", methods = ["POST"])
def add_post():
    data = request.json
    postContent = data["postContent"]
    try:
        db = get_db()
        db.execute("INSERT INTO posts (userId, postContent, likeCount) VALUES (1, ?, 0)", (postContent,))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

