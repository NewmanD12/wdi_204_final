# Jira-clone

# FRONT-END

# Register Page
    - User will be able to register to use the app
    - User's password is encrypted via salt+hash algorithm.

# Login Page
    - User that already has an account will be able to login

# All Projects Page
    - Shows all of the projects
    - Projects the user is admin of will be shown first

# Single Project Page
    - Shows all issues and what stage they are in
    - Issues show description, assignee/assigness, activity (comments, history), and details


# BACK-END

# USERS/ADMINS
    - User will be able to create new projects, be assigned to projects as user or admin, comment on issues, and progress issues. CAN NOT REVIEW OR CLOSE ISSUES 
    - Admin user for a project will be able to review/close issues (creator by default)

# PROJECT
    - On creation, the creator will be assigned as an admin for the project
    - User will be able to create issues
    - Issues will fall into 1 of 4 stages: ['To Do', 'In Progress', 'In Review', 'Complete']

# ISSUES
    - Will have a history (timestamps when stage is changed and by whom)
    - Will have comments from users and admins