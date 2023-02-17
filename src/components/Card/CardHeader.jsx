import React from 'react'

import PropTypes from 'prop-types'

export default function CardHeader({ title = '' }) {
  return <div>{title}</div>
}

CardHeader.propTypes = {
  title: PropTypes.string,
}
