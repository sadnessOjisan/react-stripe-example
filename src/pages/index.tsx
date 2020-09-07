import * as React from "react";
// Stripe Elements is a set of prebuilt UI components, like inputs and buttons, for building your checkout flow.
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  // public key
  const stripeApiKey =
    "pk_test_51HLU77BUWDSmzbsOYdzhlBW8pFrZ6lZKYMOjyJVc4OeUDPa3TdXVFW4VhfOzXxKKwyOetwCGF4nuFsglRGeKOLqB00yjJhJ12C";
  const stripePromise = loadStripe(stripeApiKey);

  return (
    <div style={{ padding: 24 }}>
      <h1>sadnessOjisan に年収を払ってくれる御社を探してます！</h1>
      <p>お金欲しい！！！！！！！！！！</p>
      <div style={{ maxWidth: 760 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

const CheckoutForm = () => {
  // The useStripe hook returns a reference to the Stripe instance passed to the Elements provider. If you need to access the Stripe object from a class component, use ElementsConsumer instead.
  const stripe = useStripe();
  // To safely pass the payment information collected by an Element to the Stripe API, access the component’s underlying Element instance so that you can use it with other Stripe.js methods. If you use the React Hooks API, then useElements is the recommended and easiest way
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/pay", {
      method: "post",
      body: JSON.stringify({ amount: event.target.amount.value }),
      // これ忘れるとNextJSのPost API Routesが動かない！
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const secret = data.client_secret;

    const card = elements.getElement(CardElement);
    console.log("card", card);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const result = await stripe.confirmCardPayment(secret, {
      payment_method: {
        // FYI: payment_method (https://stripe.com/docs/api/payment_methods)
        /**
         * Use Element instances to collect sensitive information in your payment forms.
         * For a high-level overview of what you can do with elements,
         * see the Stripe Elements for the web guide.
         * To create an Element instance, use elements.create.
         */
        card: card,
        billing_details: {
          name: "user name",
        },
      },
    });

    if (result.error) {
      /**
       * 決済の失敗
       * * api_connection_error
       * * api_error
       * * authentication_error
       * * card_error
       * * and so on...
       */
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        /**
         * 決済に成功したときの処理をこのブロックに書く
         */
        alert("payment success!!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ marginTop: 10, marginBottom: 10, display: "block" }}>
        年棒（日本円）
      </label>
      <input name="amount" defaultValue={10000000}></input>
      <label style={{ marginTop: 10, marginBottom: 10, display: "block" }}>
        カード情報
        {/* A flexible single-line input that collects all necessary card details. */}
        <CardElement
          options={{
            style: {
              base: {
                padding: 10,
                backgroundColor: "rgb(250, 255, 189)",
                fontSize: "16px",
                color: "#424770",
                fontFamily: "Open Sans, sans-serif",
                letterSpacing: "0.025em",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#c23d4b",
              },
            },
            hidePostalCode: true,
          }}
        />
      </label>
      {/* labelの中に入れるとコピーしづらいw */}
      <p>↓テスト用クレジットカード情報↓</p>
      <ul>
        <li>番号: 4111111111111111</li>
        <li>有効期限: 02/25 (現在より後ならいつでmお)</li>
        <li>CVC: 111 (3桁ならなんでも)</li>
      </ul>
      <button
        type="submit"
        disabled={!stripe}
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: "block",
          width: "100%",
          height: "37px",
          backgroundColor: "#6772e5",
          borderRadius: "2px",
          fontWeight: 600,
          color: "#fff",
          cursor: "pointer",

          border: "none",
        }}
      >
        支払う
      </button>
    </form>
  );
};

export default Payment;
