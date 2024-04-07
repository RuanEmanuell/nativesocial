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
    query = db.execute("SELECT * from posts")
    posts = query.fetchall()
    all_posts = []
    for post in posts:
        postData = {
        "postId": post[0], 
        "userId": post[1], 
        "postContent": post[2], 
        "likeCount": post[3], 
        }
        all_posts.append(postData)
    return jsonify(all_posts)

@app.route("/addpost", methods = ["POST"])
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
    
@app.route("/likepost", methods = ["PUT"])
def like_post():
    data = request.json
    postInfo = data["postInfo"]
    postId = postInfo["postId"]
    postLikeCount = postInfo["postLikeCount"]
    try:
        db = get_db()
        db.execute("UPDATE posts SET likeCount = ? WHERE id = ?", (postLikeCount + 1, postId))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

