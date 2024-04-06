## NativeSocial
    
### What is this? 🤔 
A mini social network made with React Native, Python with Flask and SQLIte

Still under development.
    
### Where can I access it? 🖥
You need to download the files from this directory.
    
### Which technologies were used to build it? 🚀 
<table><tr><td style="padding: 5px;">
        <div style="background-color: #333; width: 200px; height: 50px; padding: 10px;">
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' width="25" height="25" style="border-radius: 5px;">
            <p style="color: white; padding: 5px; margin: 0;">React Native</p>
        </div>
    </td><td style="padding: 5px;">
        <div style="background-color: #333; width: 200px; height: 50px; padding: 10px;">
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' width="25" height="25" style="border-radius: 5px;">
            <p style="color: white; padding: 5px; margin: 0;">Python</p>
        </div>
    </td><td style="padding: 5px;">
        <div style="background-color: #333; width: 200px; height: 50px; padding: 10px;">
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' width="25" height="25" style="border-radius: 5px;">
            <p style="color: white; padding: 5px; margin: 0;">SQLite</p>
        </div>
    </td><td style="padding: 5px;">
        <div style="background-color: #333; width: 200px; height: 50px; padding: 10px;">
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' width="25" height="25" style="border-radius: 5px;">
            <p style="color: white; padding: 5px; margin: 0;">Bash</p>
        </div>
    </td></tr></table>
    
### How to run (will be updated as the project is developed)🏃

     Linux:
        1 - Clone the repository.
        2 - Setup <a href="https://reactnative.dev/docs/environment-setup"">React Native</a> and the emulator / device.
        3 - Execute the "run.sh" file available in the repository and it will automatically run. (Inserting password may be necessary in order to run sudo commands)

    Windows:
        1 - Setup <a href="https://reactnative.dev/docs/environment-setup"">React Native</a> and the emulator / device.
        2 - Install Phyton3 and pip. 
        3 - Install SQLite 3.
        4 - After that, you will need to install python-dotenv, flask and flask-cors. 
        5 - cd to server/database and create "database.db"
        6 - Execute "setup_db.py"
        7 - Cd to server and execute the command "flask --app server run" to run the backend server.
        8 - Cd to client and run "npx react-native start"

