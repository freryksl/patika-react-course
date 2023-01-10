import React from 'react'
import styles from './styles.module.css'

export const Button = (props) => {
  const {type, px, py, children} = props
  return (
    <button
    className={`${styles.button} ${styles[type] || styles["default"]}`}
      style={{ padding: `${px || 10}px ${py || 20}px` }}
      {...props}
    >
      {children}
    </button>
  )
}
