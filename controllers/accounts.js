const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('./isAuth');
//MODELS
const User = require('../models/user');

//CREAT ACCOUNT
router.post('/createAccount', async (request,response) => {

    //Get user inputs
    const { firstName, lastName,email, password,mobile}=request.body;
    //Check if user exists
    User.findOne({email : email})
    .then(async account => {
        if(account){
            return response.status(200).json({message:'User Is Already Exist, Please try Other Email'});
        }
        else{
            //Crypt password
            const formatted_password = await bcryptjs.hash(password, 10);
            //Generate passcode
            const passcode = generateRandomIntegerInRange(1000,9999);
            //Create user in MongoDB
            const _user = new User({
                _id:mongoose.Types.ObjectId(),
                email: email ,
                password: formatted_password,
                mobile: mobile,
                firstName: firstName,
                lastName: lastName,
                passcode:passcode,
            })
            _user.save()
            .then(account_created=>{
                return response.status(200).json({
                    message: account_created
                });
            })
        }
    })
    .catch(err=>{
        return response.status(500).json({
            message: err
        });
    })

    //return response.status(200).json({message:`Hello ${firstName} ${lastName} 
    //your email is: ${email}, your mobile is: ${mobile},
    // your password is: ${password}`});
})
//LOGIN
router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    User.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          if (user.isApproved && !user.isLocked) {
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
              //create token
              const acc_data = {
                firstName: user.firstName,
                lastName: user.lastName,
                avata: user.avata,
                mobile: user.mobile,
                email: user.email,
                _id: user._id,
              };
  
              const token = await jwt.sign(
                acc_data,
                "A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF"
              );
  
              // response
              return response.status(200).json({
                token: token,
              });
            } else {
              return response.status(200).json({
                message: 'your password is not match',
              });
            }
          } else {
            return response.status(200).json({
                message: 'your account is not approved',
            });
          }
        } else {
          return response.status(200).json({
            message: 'email not exist',
          });
        }
      })
      .catch((err) => {
        return response.status(200).json({
            message: 'user not found',
        });
      });
  });
//VERIFY PASSCODE
router.post('/verify',async (request,response)=>{
    //Get Passcode And email  
    const {email,passcode}=request.body;
    //Is User Exist
    User.findOne({email:email})
    .then(async account =>{
        if(account){
        //Verify Code
        if(account.passcode == passcode){
            //Update IsApproved
            account.isApproved = true;
            account.save()
            .then(account_updated =>{
                //Response
                return response.status(200).json({
                    message: account_updated
                });
            })
        } else{
            return response.status(200).json({
                message: 'Passcode Not Match!'
            });
        }
        }else{
            return response.status(200).json({
                message: 'User Not Found!'
            });
        }
    })
    .catch(err=>{
        return response.status(500).json({
            message: err
        });
    })
    

});
//FORGET PASSWORD
router.post('/forgetPassword',async (request, response)=>{
    //Get user Email
    const email=request.body.email;
    //Is User Exist?
    User.findOne({email: email})
    .then(async account =>{
        if(account)
        {
            const passcode = generateRandomIntegerInRange(1000,9999);
            account.passcode = passcode;
            account.save()
            .then(account_update=>{
                return response.status(200).json({
                    message: account_update.passcode
                });
            })
        }
        else
        {
            return response.status(200).json({
                message:'User Not Exist'
            });
        }
    })
    .catch(err=>{
        return response.status(500).json({
            message: err
        });
    })
})
//UPDATE NEW PASSWORD
router.post('/updateNewPassword',async (request, response)=>{
    const {email,newpassword}=request.body;
    User.findOne({email: email})
    .then(async account=>{
        if(account)
        {
            const formatted_password = await bcryptjs.hash(newpassword, 10);
            account.password = formatted_password;
            account.save()
            .then(account_updated=>{
                return response.status(200).json({
                    message:account_updated
                });
            })
        }
        else
        {
            return response.status(200).json({
                message: 'User Not Exist'
            });
        }
    })
    .catch(err=>{
        return response.status(500).json({
            message: err
        });
    })
})
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}       
router.get('/sayHello', async(request, response)=>{
    try {
        const users = await User.find();
        return response.status(200).json({message:users});
    } catch (error) {
        return response.status(500).json({message:error});
    }
})

router.get('/getUserData',isAuth,async (request,response)=>{
    return response.status(200).json({
        message: `Hello ${request.account.firstName}`
    });
})
module.exports = router;