import * as React from 'react'
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const videoId = 'sample'

const Payment = () => {
    const stripeApiKey = 'pk_test_51HLU77BUWDSmzbsOYdzhlBW8pFrZ6lZKYMOjyJVc4OeUDPa3TdXVFW4VhfOzXxKKwyOetwCGF4nuFsglRGeKOLqB00yjJhJ12C'
    const stripePromise = loadStripe(stripeApiKey);
    React.useEffect(() => {

    }, [])
    return <div>
        <div style={{ maxWidth: 760 }}>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements></div>
    </div>
}

const CheckoutForm = () => {
    return <CardElement></CardElement>
}

export default Payment