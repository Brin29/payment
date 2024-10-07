import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js" 
import "bootswatch/dist/lux/bootstrap.min.css"
import axios from "axios"
import { useState } from "react"

const stripePromise = loadStripe("pk_test_51OW2cUDdNCdWc3LA3KkOuQneKlo3Y9V0hHazLEsEiWqDj4Zg9Iy5LK769eaLg8DeH0mu6K625WhOcRxrwb20qvvV0096RMBmbX")

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) 
    }); 

    if (!error) {
      const { id } = paymentMethod;

      const {data} = await axios.post("http://localhost:3001/api/checkout", {
        id,
        amount: 10000
      })

      console.log(data);

    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">
    <img src="https://i.pinimg.com/564x/63/b8/92/63b89236ea28ee1947a7e853f0dd37f0.jpg" alt="Berserk Tomo" className="img-fluid" title="Berserk Manga"/>

    <h3 className="text-center my-2">Price: 100$</h3>

    <div className="form-group">
      <CardElement className="form-control"/>
    </div>

     <button className="btn btn-success">
        Buy
     </button>
  </form>
}

function App() {

  return (
    <>
      {/* Acceder a la conexion */}
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <CheckoutForm/>
            </div>
          </div>
        </div>
      </Elements>
    </>
  )
}

export default App
