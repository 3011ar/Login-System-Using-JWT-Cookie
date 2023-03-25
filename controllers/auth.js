const mysql = require('mysql'); // getting mysql from node_molues
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // we are running our database on locally so local host , if it wasn't local host add the api here
    user: process.env.DATABASE_USER, // user is root
    password: process.env.DATABASE_PASSWORD, // passwd
    database: process.env.DATABASE // add here database name
});

exports.login = async(req,res) =>{
    try {
        const { email , password } = req.body ;
        if( !email || !password ){
            return res.status(400).render('login' , {
                message : 'Please provide and email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?' , [email] , async(error,result) => {
            console.log(result)
            if( !result || result.length == 0 || !(await bcrypt.compare(password , result[0].password )) ){
                res.status(401).render('login' ,{
                    message : 'Email or Password is incorrect'
                })
            }
            else{
                const id = result[0].id;
                //creating a token
                const token  = jwt.sign({ id : id } , process.env.JWT_SECRET , {
                    expiresIn : process.env.JWT_EXPIRES_IN
                });

                console.log("The token is : " + token );

                //when does our token expires
                const cookieOptions = {
                    expires : new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                    ),
                    //just to prevent if someone is not messing with our cookies 
                    httpOnly : true 
                }
                //we can use any name here in res.cookie(name , token , cookieoptions ) ;
                //after a user is loged in we put cookie in browser
                res.cookie('jwt' , token , cookieOptions );
                res.status(200).redirect('/');
            }
        })
    } catch (error) {
        console.log(error);
    }

}

exports.register = (req,res) => {
    console.log(req.body);
    // const name = req.body.name;
    // var email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;


    //de-structuring in javaScript....
    const { name , email , password , passwordConfirm } = req.body;
    

    db.query('SELECT email FROM  users WHERE email = ?' , [email] , async (error , result)=>{
        if(error){
            console.log(error);
        }
        if( result.length > 0 ){
            return res.render('register' ,{
                message : 'That email is already registered'
            })
        }
        else if( password !== passwordConfirm ){
            return res.render('register' ,{
                message : 'Incorrect password'
            })
        }

        let hashedPassword = await bcrypt.hash(password , 8);

        console.log(hashedPassword);
        
        db.query('INSERT INTO users SET ?' ,{name : name , email : email , password : hashedPassword } , (error,result)=> {
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
                return res.render('register' ,{
                    message : 'User Registered'
                })
            }
        });
    })
    
}

exports.isLoggedIn = async(req,res,next) => {
    
    console.log(req.cookies);
    if( req.cookies.jwt ){
        try {
            //step 1 : Verify the token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt , 
                process.env.JWT_SECRET
                )

                console.log(decoded);

            //step 2: check if the user still exists 
            db.query('SELECT * FROM users WHERE id = ?' , [decoded.id] , (error,result) => {
                console.log(result);

                if( !result ){
                    return next();
                }
                req.user = result[0];
                return next();
            });

        } catch (error) {
           console.log(error) ;
           return next();
        }
    }
    else{
        next();
    }
}

exports.logout = async( req , res ) => {
    res.cookie('jwt' , 'logout' , {
        expires : new Date(Date.now() + 2*1000 ) ,
        httpOnly: true
    });
    res.status(200).redirect('/');
}