const WelcomeEmailTemplate = ({
  employeeName,
  password,
  employeeId,
}: {
  employeeName: string;
  password: string;
  employeeId: string;
}) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Successful</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  background-color: #007bff;
                  color: #ffffff;
              }
              .content {
                  padding: 20px;
                  text-align: center;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  background-color: #f4f4f4;
                  color: #777777;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin: 20px 0;
                  color: #ffffff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Registration Successful</h1>
              </div>
              <div class="content">
                  <h2>Hello ${employeeName},</h2>
                  <p>Thank you for registering with us! Your account has been successfully created.</p>
                  <p>Your employee id is: <strong>${employeeId}</strong></p>
                  <p>Your temporary password is: <strong>${password}</strong></p>
                  <p>You can now log in and start using our services.</p>
                  <a href="" class="button">Log In</a>
                  <p>If you have any questions, feel free to contact our support team.</p>
              </div>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} ZenQuix Technologies Inc. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
  `;
};

export default WelcomeEmailTemplate;
