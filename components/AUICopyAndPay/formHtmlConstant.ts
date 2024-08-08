const generateHtml = (brands: string): string => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Form</title>
    <script src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=REPLACE_WITH_CHECKOUT_ID"></script>
    <script> 
        var wpwlOptions = { style: "card" };
    </script>
    <style>
        body {
            background-color: #5BD894;
            font-family: Gilroy, Arial, sans-serif;
            color: black;
            display: flex;
            flex-direction:row;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
        }
        .wpwl-form {
            margin:0;
            background-color: rgba(0, 0, 255, 0.1);
            padding: 20px 25px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            self-align:center;
        }
        .wpwl-group-submit button {
            background: #f5f7fa;
            color: black;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            self-align:center;
        }
    </style>
</head>

<body>
    <form action="https://linguistedu.com/payment-status" class="paymentWidgets" data-brands="${brands}"></form>
</body>
</html>`;

export const htmlFile: { [key: string]: string } = {
    cardpay: generateHtml("VISA MASTER AMEX MADA"),
    applepay: generateHtml("APPLEPAY"),
    gpay: generateHtml("GOOGLEPAY")
    // Add other payment options here
};
