const jwt =  require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        // 3 argumentos
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                console.log("🚀 ~ file: jwt.js ~ line 15 ~ returnnewPromise ~ err", err)
                console.log(err);
                reject( "Failed to generate token in jwt" )
            }

            resolve( token )
        })

    })

};


module.exports = {generateJWT};