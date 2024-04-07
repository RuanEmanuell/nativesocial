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

@app.route("/getuser", methods = ["GET"])
def get_user():
    user_email = request.args.get("userEmail")

    db = get_db()
    query = db.execute("SELECT u.email FROM users u WHERE u.email = ?", (user_email,))
    user_exists = query.fetchone()
    print(user_exists)
    return jsonify(user_exists)

@app.route("/adduser", methods = ["POST"])
def add_user():
    data = request.json
    user_name = data["userName"]
    user_email = data["userEmail"]
    try:
        db = get_db()
        db.execute("INSERT INTO users (name, email) VALUES (?, ?)", (user_name, user_email,))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

@app.route("/getposts", methods = ["GET"])
def get_posts():
    db = get_db()
    query = db.execute("SELECT p.id, p.userId, p.postContent, p.likeCount, u.name FROM posts p LEFT JOIN users u ON p.userId = u.id")
    posts = query.fetchall()
    all_posts = []
    for post in posts:
        postData = {
        "postId": post[0], 
        "userId": post[1], 
        "postContent": post[2], 
        "likeCount": post[3], 
        "userName": post[4], 
        }
        all_posts.append(postData)
    return jsonify(all_posts)

@app.route("/addpost", methods = ["POST"])
def add_post():
    data = request.json
    post_content = data["postContent"]
    post_user_email = data["userEmail"]
    try:
        db = get_db()
        
        query = db.execute("SELECT id FROM users WHERE email = ?", (post_user_email,))
        post_user_id = query.fetchone()[0]

        db.execute("INSERT INTO posts (userId, postContent, likeCount) VALUES (?, ?, 0)", (post_user_id, post_content,))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500
    
@app.route("/likepost", methods = ["PUT"])
def like_post():
    data = request.json
    post_info = data["postInfo"]
    post_id = post_info["postId"]
    post_like_count = post_info["postLikeCount"]
    try:
        db = get_db()
        db.execute("UPDATE posts SET likeCount = ? WHERE id = ?", (post_like_count + 1, post_id))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

