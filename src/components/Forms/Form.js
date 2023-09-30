import { useState } from "react";
import Styles from "./form.module.css";
import icon from "./../../asset/icon-complete.svg";
export default function Form({ onChange }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, SetCVC] = useState("");
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handelSubmit(e) {
    e.preventDefault();
    const newCardDeatils = {
      name,
      cardNumber,
      month,
      year,
      cvc,
    };
    const newErrors = formErros(newCardDeatils);
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      updateValues(newCardDeatils);
      setIsSubmit(true);
    }
  }

  function updateValues(newCardDeatils) {
    onChange(newCardDeatils);
    setName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    SetCVC("");
  }

  function formErros(newCardDeatils) {
    const errors = {};
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (newCardDeatils.name === "") {
      errors.name = "Name cant be blank";
    }
    if (specialChars.test(newCardDeatils.name)) {
      errors.name = "Enter Valid name";
    }
    if (newCardDeatils.cardNumber === "") {
      errors.cardNumber = "Cardnumber cant be blank";
    }
    if (newCardDeatils.month === "") {
      errors.month = "Expiry month cant be blank";
    }
    if (newCardDeatils.year === "") {
      errors.year = "Expiry year cant be blank";
    }
    if (newCardDeatils.cvc === "") {
      errors.cvc = "CVC cant be blank";
    }
    if (
      !/^\d+$/.test(newCardDeatils.cardNumber) ||
      specialChars.test(newCardDeatils.cardNumber)
    ) {
      errors.cardNumber = "Enter valid number";
    }
    if (newCardDeatils.cardNumber.length < 16) {
      errors.cardNumber = "Number must be 16 characters long";
    }
    if (
      !/^\d+$/.test(newCardDeatils.month) ||
      specialChars.test(newCardDeatils.month)
    ) {
      errors.month = "Enter valid number";
    }
    if (Number(newCardDeatils.month) > 12 || Number(newCardDeatils.month) < 1) {
      errors.month = "Month must be between 1-12";
    }
    if (
      !/^\d+$/.test(newCardDeatils.year) ||
      newCardDeatils.year.length < 2 ||
      specialChars.test(newCardDeatils.year)
    ) {
      errors.year = "Enter valid year";
    }
    if (
      !/^\d+$/.test(newCardDeatils.cvc) ||
      newCardDeatils.cvc.length < 3 ||
      specialChars.test(newCardDeatils.cvc)
    ) {
      errors.cvc = "Enter valid number";
    }
    return errors;
  }

  function handelContinue(e) {
    e.preventDefault();
    setIsSubmit(false);
  }

  return isSubmit ? (
    <form className={Styles.success} onSubmit={handelContinue}>
      <img src={icon} alt="icon" />
      <p>Credit Card Details submitted successfully.</p>
      <button>Continue</button>
    </form>
  ) : (
    <form onSubmit={handelSubmit}>
      <div>
        <label>Cardholder name</label>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error.name && <p className={Styles.error}>{error.name}</p>}
      </div>
      <div className={Styles.margin}>
        <label>Card number</label>
        <input
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {error.cardNumber && <p className={Styles.error}>{error.cardNumber}</p>}
      </div>
      <div className={Styles.expiry}>
        <div className={Styles.date}>
          <label>Expiary Date(mm/yy)</label>
          <div className={Styles.flex}>
            <div>
              <input
                type="text"
                placeholder="00"
                maxLength={2}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              {error.month && <p className={Styles.error}>{error.month}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="00"
                maxLength={2}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {error.year && <p className={Styles.error}>{error.year}</p>}
            </div>
          </div>
        </div>
        <div className={Styles.cvc}>
          <label>Cvc</label>
          <input
            type="text"
            placeholder="000"
            maxLength={3}
            value={cvc}
            onChange={(e) => SetCVC(e.target.value)}
          />
          {error.cvc && <p className={Styles.error}>{error.cvc}</p>}
        </div>
      </div>
      <button>Confirm</button>
    </form>
  );
}
