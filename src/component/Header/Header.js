import React from "react"
import styles from "./Header.module.css"
import {Link} from "react-router-dom"
import Button from "../Button/Button"

function Header(){
  return(
    <>
    <div className={styles.topBar}>
      <div className="latime">
    <div className={styles.menu}>
      <Link to="/recipes"><div className={styles.menuText}>Recipe App</div></Link>
      <Link to="/createRecipe"><Button text="Adauga o reteta" topBar={true}/></Link>
    </div>
    </div>
    </div>
    </>
  )
}

export default Header