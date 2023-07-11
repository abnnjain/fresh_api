const Admin = require('../models/admin.model');
const User = require('../models/user.model');


module.exports = {
    reg: async (req,res,next) => {
        try {
            const result = //req.body
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.file.filename
            };
            const doesExist = await Admin.findOne({ email: result.email });
            if (doesExist)
              throw new Error(`${result.email} has already been registered.`);
    
            // Save the user to the database
            const admuser = new Admin(result);
            const savedUser = await admuser.save();
            if (savedUser) {
                console.log("Admin registered Successfully");
              return res.send({
                success: true,
                data: savedUser,
                message: "Admin registered successfully",
              });
            }
            console.log("Registration Failed");
            return res.send({
              success: false,
              message: "Error in saving the data",
            });
        //   });
        } catch (error) {
          console.error("Error occurred during registration:", error);
          return res.status(500).send({ success: false, message: "Error occurred during registration" });
        }
    },

    getUsers: async (req, res, next) => {
      try {
        const searchTerm = req.query.search || ''; // Retrieve the search term from the query parameter
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression for the search term
    
        const usersList = await User.find({ $or: [{ name: regex }, { email: regex }] }); // Fetch user data from the database based on the search term
    
        // Define the number of users to display per page
        const usersPerPage = 5;
    
        // Retrieve the page number from the request query parameters
        const currentPage = parseInt(req.query.page) || 1;
    
        // Calculate the starting and ending indices for the current page
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
    
        // Retrieve the users for the current page
        const usersOnCurrentPage = usersList.slice(startIndex, endIndex);
    
        // Construct the pagination metadata
        const totalPages = Math.ceil(usersList.length / usersPerPage);
        const pagination = {
          currentPage,
          totalPages,
          hasPrevPage: currentPage > 1,
          hasNextPage: currentPage < totalPages
        };
    
        // Render the admin/dashboard view and pass the users data
        res.render('admin/dashboard', {
          usersList,
          usersOnCurrentPage,
          pagination,
          searchTerm
        });
      } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
      }
    },
    
    
    login: async (req,res,next) => {
        try {
            const result = /*req.body*/ {
                email: req.body.email,
                password: req.body.password,
              } //taking the input
            const user = await Admin.findOne({email: result.email}) //checking the email in db
            if(!user) throw new Error('Admin User NOT FOUND'); 
            const isMatch = await user.isValidPassword(result.password) //verifying the password from db
            if(!isMatch) new Error('Password not Valid')/*createError.Unauthorized('Password not valid')*/
            if (user){
                console.log("Admin Loggedin successfully");
            res.send({success: true, data: user, message: "Admin login successfully"})
            return res.redirect('/adminDashboard')
                }
                console.log("Login Failed");
            return res.send({success : false, message: "error something"})
        } catch (error) {
            console.error("Error occurred during logging in:", error);
      return res.status(500).send({ success: false, message: "Error occurred during logging in" });
        }
    },

    downloadUsers: async (req, res) => {
        try {
          const users = await User.find(); // Fetch user data from the database
      
          // Convert the user data to a formatted string
          const userListString = users.map(user => `${user.name}, ${user.email}`).join('\n');
      
          // Set the response headers for downloading the file
          res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
          res.setHeader('Content-Type', 'text/csv');
      
          // Send the user data as the response
          res.send(userListString);
        } catch (error) {
          console.error('Error retrieving users:', error);
          res.status(500).send('Error retrieving users');
        }
    },

    logout: async (req,res,next) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                  console.error("Error occurred during logout:", err);
                  return res.status(500).send({ success: false, message: "Error occurred during logout" });
                }
                console.log("Admin logged out successfully");
                return res.send({ success: true, message: "Admin logged out successfully" });
              });
        } catch (error) {
            next (error)
        }
    }
}