const express = require('express');
const authController = require('../controllers/auth')

const router = express.Router();


// creating a root so to check if its send response to backend or not
router.get('/' , authController.isLoggedIn , (req,res)=>{
    res.render("index" , {
        user_details : req.user
    })
});

//register page

router.get('/register' , (req,res)=>{
    res.render('register')
});
router.get('/login' , (req,res)=>{
    res.render('login')
});

router.get('/profile' , authController.isLoggedIn ,  (req,res)=>{
    console.log(req.user);

    if( req.user ){
        res.render('profile' , {
            user_details : req.user
        })
    }
    else{
        res.redirect('/login');
    }
    
})

module.exports = router ;