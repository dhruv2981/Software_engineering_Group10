# DocOps

Docops is a feature-rich collaborative code and document editor designed to streamline teamwork among developers, offering a seamless experience for real-time coding, communication, and collaboration. Whether you're working on a small project with a partner or collaborating with a larger team, DocOps provides the tools you need to code together efficiently and effectively.

## Key Features:

1. **Channeli outh:**
   - Securely authenticate users through channeli outh, ensuring that only authorized individuals can access the editor.

2. **Public and Private Collaborative Documents:**
   - Create public documents for open collaboration or private documents for exclusive team projects.
   - Real-time synchronization allows team members to see changes instantly, fostering seamless collaboration regardless of document visibility.

3. **Cursor Highlighting:**
   - Visualize team members' cursor positions in real time, facilitating awareness of who is editing which part of the code.
   - Differentiate between collaborators with name beside cursor, making it easy to track individual contributions.

4. **Code Runner:**
   - Execute code directly within the editor environment to quickly test and debug scripts.
   - Support for various programming languages and frameworks, enabling comprehensive code execution capabilities.

5. **Video Calling Integration:**
   - Seamlessly initiate video calls directly from the editor interface to discuss code changes or brainstorm ideas.
   - Integrated video conferencing enhances real-time communication, reducing the need for external communication tools.

6. **Display Picture Addition:**
   - Personalize user profiles with display pictures, adding a human touch to the collaborative environment.
   - Easily identify team members through their unique display pictures, enhancing team cohesion and recognition.

7. **Document Renaming:**
   - Rename collaborative documents effortlessly to maintain organization and clarity within projects.
   - Intuitive document management features simplify file naming conventions, ensuring consistency across the team.
8. **Notification System:**

   -Users will receive notifications upon logging in to the application. These notifications will provide important updates, announcements, or reminders to keep users informed about the latest        developments and activities within the collaborative environment.





## Setup Instructions:

1. Clone the repo. <br>
```
 $ git clone https://github.com/dhruv2981/Software_engineering_Group10.git
```

2. SetUp the frontend.
```
 $ cd frontend
 $ yarn install
 $ yarn dev --port 5174
```

3. Create a virtual environment of python activate it and install the dependencies.
```
$ pip install virtualenv
$ virtualenv --version
$ virtualenv my_env
$ virtualenv -p /usr/bin/python3 virtualenv_name
$ cd <envname>
$ Scripts\activate

```

4. Setup the backend.

```
 $ cd backend
 $ pip install -r requirements. txt
 $ python manage.py runserver
```

5. Run the websockets
```
$ npx @hocuspocus/cli --port 1234 --sqlite
```