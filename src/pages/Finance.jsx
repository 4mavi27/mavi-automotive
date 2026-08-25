import { useState } from "react"
import "./Finance.css"

function Finance() {
  // Form state
  const [carPrice, setCarPrice] = useState("")
  const [deposit, setDeposit] = useState("")
  const [months, setMonths] = useState(48)
  const [apr, setApr] = useState(9.9)

  // Calculate the amount that needs to be financed
  const amountToFinance =
    Number(carPrice) - Number(deposit)

  // Convert annual percentage rate into a monthly decimal rate
  const monthlyRate =
    Number(apr) / 100 / 12

  // Check whether the deposit is greater than the vehicle price
  const isInvalidDeposit =
    Number(deposit) > Number(carPrice)

  // Calculate the estimated monthly payment
  // If APR is 0%, use simple division
  const monthlyPayment =
    amountToFinance > 0
      ? monthlyRate > 0
        ? (
            amountToFinance *
            monthlyRate *
            Math.pow(
              1 + monthlyRate,
              Number(months)
            )
          ) /
          (
            Math.pow(
              1 + monthlyRate,
              Number(months)
            ) - 1
          )
        : amountToFinance / Number(months)
      : 0

  // Calculate the total amount paid over the full finance term
  const totalRepayable =
    monthlyPayment * Number(months)

  // Calculate the total interest paid
  const totalInterest =
    totalRepayable - amountToFinance

  return (
    <section className="finance-page">

      <div className="finance-header">
        <p className="finance-eyebrow">
          CAR FINANCE
        </p>

        <h1>Finance Calculator</h1>

        <p>
          Calculate an estimated monthly payment
          for your next vehicle.
        </p>
      </div>

      <div className="finance-calculator">

        <label>Car Price</label>

        <input
          type="number"
          min="0"
          placeholder="Enter car price"
          value={carPrice}
          onChange={(event) =>
            setCarPrice(event.target.value)
          }
        />

        <label>Deposit</label>

        <input
          type="number"
          min="0"
          placeholder="Enter deposit"
          value={deposit}
          onChange={(event) =>
            setDeposit(event.target.value)
          }
        />

        <label>Finance Term</label>

        <select
          value={months}
          onChange={(event) =>
            setMonths(event.target.value)
          }
        >
          <option value="24">
            24 months
          </option>

          <option value="36">
            36 months
          </option>

          <option value="48">
            48 months
          </option>

          <option value="60">
            60 months
          </option>
        </select>

        <label>APR (%)</label>

        <input
          type="number"
          min="0"
          step="0.1"
          value={apr}
          onChange={(event) =>
            setApr(event.target.value)
          }
        />

        <div className="finance-result">

          {isInvalidDeposit ? (
            <p className="finance-error">
              Deposit cannot be greater than
              the car price.
            </p>
          ) : (
            <>
              <p>Amount To Finance</p>

              <h2>
                £
                {amountToFinance > 0
                  ? amountToFinance.toLocaleString()
                  : "0"}
              </h2>

              <p>Estimated Monthly Payment</p>

              <h2>
                £
                {monthlyPayment > 0
                  ? monthlyPayment.toFixed(2)
                  : "0.00"}
              </h2>

              <p>Total Repayable</p>

              <h2>
                £
                {totalRepayable > 0
                  ? totalRepayable.toFixed(2)
                  : "0.00"}
              </h2>

              <p>Total Interest</p>

              <h2>
                £
                {totalInterest > 0
                  ? totalInterest.toFixed(2)
                  : "0.00"}
              </h2>
            </>
          )}

        </div>
      </div>
    </section>
  )
}

export default Finance