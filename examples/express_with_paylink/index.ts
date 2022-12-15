import express from 'express';
import cors from 'cors';

import { Invoice, OrderStatus, PayLink } from '../../src/index';
import { Database } from './database/database';

import { v4 as uuidv4 } from 'uuid';

// Setup Express
const router = express.Router();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to PayLink SDK example!');
});

app.post('/createInvoice', async (req, res) => {
  const { name, mobile, productId } = req.body;

  if (!name || !mobile || !productId) {
    console.log(req.body);
    res.status(405).json({ error: 'Bad request, missing or invalid [name] or [mobile] or [productId]' });
    return;
  }

  const productFromDatabase = Database.products.find((product) => product.id == productId);

  //The product doesn't exist in the database
  if (!productFromDatabase) {
    console.log(req.body);
    res.status(404).json({ error: `The product with ${productId} doesn't exists` });
  } else {
    //FIXME
    const paylink = await PayLink.init({});

    // Create Invoice using client information and product information
    const invoice: Invoice = await paylink.createInvoice({
      amount: productFromDatabase.price,
      callBackUrl: '/processPayment',
      clientName: name,
      clientMobile: mobile,
      orderNumber: uuidv4(),
      products: [
        {
          price: productFromDatabase.price,
          title: productFromDatabase.name,
          description: productFromDatabase.description,
          qty: 1,
          isDigital: false,
        },
      ],
    });

    return res.json({ invoice: invoice });
  }
});

app.post('/isPaid', async (req, res) => {
  const { transactionNo } = req.body;

  if (!transactionNo) {
    console.log(req.body);
    res.status(405).json({ error: 'Bad request, missing or invalid [transactionNo]' });
    return;
  }

  //FIXME
  const paylink = await PayLink.init({});

  const invoice = await paylink.getInvoice(transactionNo);

  const isInvoicePaid = invoice.orderStatus === OrderStatus.Paid;

  return res.json({ isPaid: isInvoicePaid });
});

app.get('/processPayment', async (req, res) => {
  // Get the [transactionNo] from the callback link
  const transactionNo: string = req.query.transactionNo as string;

  if (!transactionNo) {
    console.log(req.body);
    res.status(405).json({ error: 'Bad request, missing or invalid [transactionNo]' });
    return;
  }

  //FIXME
  const paylink = await PayLink.init({});

  const invoice = await paylink.getInvoice(transactionNo);

  const isInvoicePaid = invoice.orderStatus === OrderStatus.Paid;

  if (!isInvoicePaid) {
    res.status(405).json({ error: `The invoice with transactionNo ${invoice.transactionNo} was not paid` });
  }

  /** Here you can do any proses to the payment(e.g. send card )
   * Here for the sake of the tutorial, we will return the invoice object **/

  return res.json({ invoice: invoice });
});

// add router in the Express app.
app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at port:${port}`);
});
