# Online Group Study Web Application

The Online Group Study web application is a platform that facilitates collaborative learning by allowing users to create assignments, complete them, and grade their friends' assignments. Below are the features and usage guidelines for this web application.

## Features

### Authentication
- Users can register an account using their name, photoURL, email, and password.
- Social login options (e.g., Google login, GitHub signup) are available.
  
### Assignment Management
#### Assignment Creation
- Any logged-in user can create assignments for all users.
- Assignments include a title, description, marks, thumbnail image URL, assignment difficulty level (easy, medium, hard), and due date.
- Success messages are displayed upon successful assignment creation.
  
#### Assignment Deletion
- Only the assignment creator can delete their own assignments.
- Users cannot delete assignments created by others.
- Success messages are shown upon successful assignment deletion.
- Error messages are displayed when attempting to delete assignments created by others.

#### Assignment Updating
- Any user can update any assignment.
- Assignment fields are automatically populated with previous data for easy updating.
- Success messages are displayed upon successful assignment updates.

### Taking Assignment as an Individual
- Users can visit the assignment page to view and filter assignments by difficulty level.
- Each assignment displays a thumbnail, title, marks, difficulty level, and "View Assignment" and "Update Assignment" buttons.
- Users can click the "View Assignment" button to access assignment details and "Take Assignment."

### Assignment Submission
- Users can submit assignments, providing a PDF link and a quick note.
- Submitted assignments are marked as pending, and the user's email is associated with the submission.

### Marking Assignments
- The "Submitted Assignment" page displays all pending submissions.
- Users can view details, marks, and feedback for each submission.
- Users can give marks for submissions.
- After marking, the assignment status changes to "completed."

### Additional Pages
- Home page with a public navbar, banner section, feature section, and FAQ.
- Create Assignment page (private) for assignment creation.
- All Assignments page (public) displaying all created assignments.
- My Assignment page (private) showing the user's submitted assignments.
- Submitted Assignment page (private) displaying all pending submissions.
- Dynamic pages for updating and viewing individual assignments.
- Public login and registration pages.


## Usage

To use the Online Group Study web application, follow these common scenarios:

1. **Authentication**
   - Register an account or log in using social login.
   
2. **Assignment Management**
   - Create assignments with details and due dates.
   - Delete or update assignments (ownership restrictions apply).

3. **Taking Assignment**
   - View available assignments based on difficulty levels.
   - Access assignment details and take assignments.
   - Submit assignments with PDF links and notes.

4. **Marking Assignments**
   - Review and mark pending assignments.
   - Provide marks and feedback for submissions.

5. **Navigation**
   - Explore different pages like "Home," "Create Assignment," "All Assignments," "My Assignments," "Submitted Assignments," and more.
   
6. **Bonus Features**
   - Read the documentation for Git commits and project features.
   - Preview PDFs, use pagination, and experience responsive design.

**Front-end Deployment:**
The front-end of the Online Group Study project is deployed at:
Front-end Deploy Link

**Back-end Deployment:**
The back-end of the Online Group Study project is deployed at:
Back-end Deploy Link

Enjoy collaborative online studying with your peers using this application!



## Front-end Deployment

The front-end of the Online Group Study project is deployed at:

[Front-end GitHub Link](https://github.com/Porgramming-Hero-web-course/b8a11-client-side-MdAbdullahIbnNoor) 
[Front-end Deploy Link](https://online-group-study.web.app/) 

## Back-end Deployment

The back-end of the Online Group Study project is deployed at:

[Back-end GitHub Link](https://github.com/Porgramming-Hero-web-course/b8a11-server-side-MdAbdullahIbnNoor)
[Back-end Deploy Link](https://online-group-study-server-nu.vercel.app/)