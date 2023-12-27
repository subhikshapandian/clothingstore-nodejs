const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {

        getOrderPlacedDetail: () => {

            return new Promise(async (resolve, reject) => {

                const { UserId } = ctx.request.query;

                let query = `SELECT od.[UserId],[ProductId],[Quantity],od.[CreatedDate],pay.TotalAmount,pay.PaymentType,od.ProductTrackingId
                ,pt.Name,pro.FileName,pro.ProductNo,pro.Description
                FROM [tbOrderItem] oitem
                INNER JOIN [tbOrderDetail] od on od.Id = oitem.OrderDetailId
                INNER JOIN [tbPayment] pay on pay.Id = od.Paymentid
                INNER JOIN [tbProductTracking] pt on pt.Id = od.ProductTrackingId
                INNER JOIN [tbProduct] pro on pro.Id = oitem.ProductId
                where pay.UserId = ${UserId}`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
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