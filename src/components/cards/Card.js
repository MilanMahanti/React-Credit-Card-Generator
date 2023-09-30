import styles from "./card.module.css";

export default function Card({ items }) {
  const number = items.cardNumber ? items.cardNumber : "0000000000000000";
  const joy = number.match(/.{1,4}/g);
  const newCardNumber = joy.join(" ");

  return (
    <div className={styles.cardcontainer}>
      <div className={styles.cardfrontcontainer}>
        <div className={styles.cardfront}>
          <div className={styles.circlebox}>
            <div className={styles["circle-filled"]}></div>
            <div className={styles["circle-border"]}></div>
          </div>
          <div className={styles.cardnumber}>
            <p>{newCardNumber}</p>
          </div>
          <div className={styles["card-details"]}>
            <div className={styles.name}>
              <p>{items.name ? items.name : "MILAN MAHANTI"}</p>
            </div>
            <div className={styles.expiry}>
              <p>
                {items.month
                  ? items.month.length < 2
                    ? `0${items.month}`
                    : items.month
                  : "12"}
                /{items.year ? items.year : "23"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardbackcontainer}>
        <div className={styles.cardback}>
          <div className={styles.cvc}>
            <p>{items.cvc ? items.cvc : "123"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
