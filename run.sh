sudo apt-get install python3
sudo apt-get install pip
sudo apt-get install sqlite-3
sudo apt-get install python3-flask

pip install Flask
pip install Flask-Cors

cd server/database
sqlite3 database.db

sleep 2

cd ..
gnome-terminal -- python3 setup_db.py

sleep 2

gnome-terminal -- flask --app server run

sleep 2

firefox http://localhost:5000/



