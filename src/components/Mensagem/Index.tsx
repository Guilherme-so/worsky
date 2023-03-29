import React from "react";
import styles from "./Mensagem.module.css";

function Mensagem({msg, ...props}: any) {
  return (
    <div className={styles.container}>
      <p>There was an error on processing your payment.</p>
    </div>
  );
}

export default Mensagem;
