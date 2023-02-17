import React from 'react'

import PropTypes from 'prop-types'
import CardHeader from './CardHeader'
import styles from './index.module.scss'

export default function Card({ title = '' }) {
  return (
    <div className={styles.customCardRoot}>
      <CardHeader title={title} />
      Hello card.
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
}
