
const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        createUser: () => {

            return new Promise(async (resolve, reject) => {

                const { UserName, EmailId, Password, PhoneNo } = ctx.request.body;

                let query = `INSERT INTO [dbo].[tbAddress] ([CreatedDate],[ModifiedDate]) VALUES(GETDATE(),GETDATE());

                 INSERT INTO [dbo].[tbUsers]([UserName],[EmailId],[Password],[AddressId],[PhoneNo],[CreatedDate],[ModifiedDate],[IsActive],[isAdmin])
                 VALUES('${UserName}','${EmailId}','${Password}',SCOPE_IDENTITY(),'${PhoneNo}',GETDATE(),GETDATE(),1);`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },

        updateUserAddress: () => {

            return new Promise(async (resolve, reject) => {

                const { Address, Area, City, State, PinCode, LandMark, AddressId } = ctx.request.body;

                let query = `UPDATE [dbo].[tbAddress]
                SET [Address] = '${Address}',[Area] = '${Area}',[City] = '${City}',[State] = '${State}',[PinCode] = '${PinCode}',
                [LandMark] = '${LandMark}',[ModifiedDate] = GETDATE() WHERE [Id] = ${AddressId}`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(1);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },


        getUser: () => {

            return new Promise(async (resolve, reject) => {

                const { userName, emailId, isActive, startDate, endDate } = ctx.request.body;


                let pram = ``;

                if (userName) {
                    pram = pram + `and [UserName] like '%${userName}%' `
                }
                if (emailId) {
                    pram = pram + `and [EmailId] like '%${emailId}%' `
                }
                if (startDate) {
                    pram = pram + `and  CAST(CONVERT(varchar(50),us.CreatedDate,101) as DateTime) >=  CONVERT(VARCHAR(50), '${startDate}', 101)  `
                }
                if (endDate) {
                    pram = pram + `and  CAST(CONVERT(varchar(50),us.CreatedDate,101) as DateTime) <=  CONVERT(VARCHAR(50), '${endDate}', 101)  `
                }


                let query = ` SELECT us.[Id],[UserName],[EmailId],[Password],[AddressId],[PhoneNo],us.[CreatedDate],us.[ModifiedDate],[IsActive],[isAdmin]
                   ,addr.[Id] AddressId, addr.[Address], addr.[Area], addr.[City], addr.[LandMark], addr.[State], addr.[PinCode]  
                   FROM [dbo].[tbUsers] us
                   left join [dbo].[tbAddress] addr on addr.Id = us.AddressId where [IsActive] =${isActive}`


                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(1);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
    }
}