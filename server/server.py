from string import Template
from flask import Flask, g, jsonify, request
import sqlite3
import hashlib

app = Flask(__name__)

DATABASE = "database/database.db"

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def encrpyt_password(password):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    return hashed_password

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

@app.route("/getuser", methods = ["GET"])
def get_user():
    user_email = request.args.get("userEmail")
    try:
        db = get_db()
        query = db.execute("SELECT u.email, u.name FROM users u WHERE u.email = ?", (user_email,))
        user_exists = query.fetchone()
        user_data = {
            "userEmail": user_exists[0] if user_exists else "",
            "userName" : user_exists[1] if user_exists else ""
        }
        return jsonify(user_data)
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

@app.route("/adduser", methods = ["POST"])
def add_user():
    data = request.json
    user_name = data["userName"]
    user_email = data["userEmail"]
    user_password = encrpyt_password(data["userPassword"])
    try:
        db = get_db()
        db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (user_name, user_email,user_password,))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

@app.route("/loginuser", methods = ["GET"])
def login_user():
    user_name = request.args.get("userName")
    user_email = request.args.get("userEmail")
    user_password = request.args.get("userPassword")
    
    db = get_db()
    query = db.execute("SELECT u.name, u.email, u.password FROM users u WHERE (u.email = ? AND u.name = ? AND u.password = ?)", (user_email,user_name,encrpyt_password(user_password),))
    user_exists = query.fetchone()
    user_data = {
        "userEmail": user_exists[0] if user_exists else "",
        "userName" : user_exists[1] if user_exists else "",
        "userPassword" : user_exists[2] if user_exists else ""
    }
    return jsonify(user_data)


@app.route("/getposts", methods = ["GET"])
def get_posts():
    try:
        db = get_db()
        query = db.execute("SELECT p.id, p.userId, p.postContent, p.likeCount, u.email, u.name FROM posts p LEFT JOIN users u ON p.userId = u.id")
        posts = query.fetchall()
        all_posts = []
        for post in posts:
            postData = {
            "postId": post[0], 
            "userId": post[1], 
            "postContent": post[2], 
            "likeCount": post[3], 
            "userEmail" : post[4],
            "userName": post[5] 
            }
            all_posts.append(postData)
        return jsonify(all_posts)
    except Exception as error:
        return jsonify({"message": "Internal error"}), 500

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

@app.route("/getuserlikes", methods = ["GET"])
def get_likes():
    user_email = request.args.get("userEmail")
    try:
        db = get_db()
        query = db.execute("SELECT id FROM users WHERE email = ?", (user_email,))
        user_id = query.fetchone()[0]

        query = db.execute("SELECT postId FROM postLikes WHERE userId = ?", (user_id,))
        posts = query.fetchall()
        posts = [num for sublist in posts for num in sublist]
        all_liked_posts = []
        for liked_post in posts:
            all_liked_posts.append(liked_post)
        return jsonify(all_liked_posts)    
    except Exception as error:
        return jsonify({"message": "Internal error"}), 500
    
@app.route("/likepost", methods = ["PUT"])
def like_post():
    data = request.json
    post_info = data["postInfo"]
    user_email = post_info["userEmail"]
    post_id = post_info["postId"]
    post_like_count = post_info["postLikeCount"]
    try:
        db = get_db()

        query = db.execute("SELECT id FROM users WHERE email = ?", (user_email,))
        user_id = query.fetchone()[0]

        query = db.execute("SELECT * FROM postLikes WHERE userID = ? AND postID = ?", (user_id, post_id,))
        user_liked = query.fetchone()

        if(user_liked):
             db.execute("UPDATE posts SET likeCount = ? WHERE id = ?", (post_like_count - 1, post_id))
             db.execute("DELETE FROM postLikes WHERE userId = ? AND postId = ? ", (user_id, post_id))
        else:
             db.execute("UPDATE posts SET likeCount = ? WHERE id = ?", (post_like_count + 1, post_id))
             db.execute("INSERT INTO postLikes VALUES (?, ?)", (user_id, post_id))

        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500
    
@app.route("/deletepost", methods = ["DELETE"])
def delete_post():
    data = request.json
    post_info = data["postInfo"]
    post_id = post_info["postId"]
    try:
        db = get_db()
        db.execute("DELETE FROM posts WHERE id = ?", (post_id,))
        db.commit()
        return jsonify({"message": "Sucess"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal error"}), 500

