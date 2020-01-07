module.exports = (data) => {   
   let line = "";
   data.supplies.forEach(supply => {
      const tempLine = data.student.receivedSupplies.some(rs => (rs.id === supply._id && !rs.incomplete)) ? 
      "<tr class='item'><td>"+supply.quantity+" "+supply.name+"</td><td>SIM</td></tr>" :
      "<tr class='item'><td>"+supply.quantity+" "+supply.name+"</td><td>NÃO</td></tr>";
      line = line + tempLine;
   })

   const today = new Date();
return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>
            .invoice-box {
            max-width: 800px;
            margin: auto;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 12px;
            line-height: 12px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;
            }
            .margin-top {
            margin-top: 30px;
            }
            .justify-center {
            font-size: 10px;
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 2px;
            vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
            text-align: right;
            }
            .invoice-box table tr.top table td {
            padding-bottom: 5px;
            }
            .invoice-box table tr.top table td.title {
            font-size: 12px;
            color: #333;
            }
            .invoice-box table tr.information table td {
            padding: 0px;
            height: 0px;
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-size: 10px;
            font-weight: bold;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #ddd;
            font-size: 8px;
            padding: 0px;
            height: 0px;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }
            @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            }
         </style>
      </head>
      <body>
         <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
               <tr class="top">
                  <td colspan="2">
                     <table>
                        <tr>
                           <td><img  src="https://maplebear.com.br/Content/images/logo-maple-bear.svg"
                              style="width:100%; max-width:150px;"></td>
                           <td>
                              ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="2">
                      <h5>Materiais escolares de ${data.student.name}</h5>
                  </td>
               </tr>
               <tr class="heading">
                  <td>Material:</td>
                  <td>Entregue?</td>
               </tr>
               ${line}
            </table>
            <br />
            <p class="justify-center">
              ________________________________________________________________<br />
            <b>Responsável</b><br /><br />
            Impresso por ${data.user.name}
            </p>
         </div>
      </body>
   </html>
   `;
};
