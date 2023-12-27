const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        createPayment: () => {

            return new Promise(async (resolve, reject) => {

                const { UserId, Amount, DiscountAmount, TotalAmount,PaymentType,Status } = ctx.request.body;

                let query = `INSERT INTO [dbo].[tbPayment]
                ([UserId],[Amount],[DiscountAmount],[TotalAmount],[PaymentType],[Status],[CreatedDate],[ModifiedDate])
                VALUES (${UserId},'${Amount}','${DiscountAmount}','${TotalAmount}','${PaymentType}',${Status},GETDATE(),GETDATE());

                INSERT INTO [dbo].[tbOrderDetail]([UserId],[PaymentId],[ProductTrackingId],[CreatedDate],[ModifiedDate])
                VALUES(${UserId},SCOPE_IDENTITY(),1,GETDATE(),GETDATE());
                select SCOPE_IDENTITY() as Id`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset[0]?.Id);
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
        insertOrderPlacedItems: (Id) => {

            return new Promise(async (resolve, reject) => {

                const {OrderedItems} = ctx.request.body;

                let query = ``;

                OrderedItems.forEach(data => {
                    query = query + `INSERT INTO [dbo].[tbOrderItem]([OrderDetailId],[UserId],[ProductId],[Quantity],[CreatedDate],[ModifiedDate])
                    VALUES(${Id},${data.UserId},${data.ProductId},${data.Quantity},GETDATE(),GETDATE());`
                });
               
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
        }
    }
}