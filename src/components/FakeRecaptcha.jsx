import { useState } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

function FakeRecaptcha({ onChange }) {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    if (checked) return
    setChecked(true)
    if (onChange) onChange('fake-recaptcha-token')
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #d3d3d3',
        borderRadius: '3px',
        backgroundColor: '#f9f9f9',
        padding: '12px 16px',
        cursor: checked ? 'default' : 'pointer',
        userSelect: 'none',
        height: '74px',
        boxSizing: 'border-box',
      }}
    >
      {/* Checkbox */}
      <Box
        sx={{
          width: '28px',
          height: '28px',
          border: checked ? 'none' : '2px solid #c1c1c1',
          borderRadius: '2px',
          backgroundColor: checked ? '#4caf50' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="white"
            />
          </svg>
        )}
      </Box>

      {/* Label */}
      <Box sx={{ fontSize: '14px', color: '#333', flexGrow: 1 }}>
        我不是機器人
      </Box>

      {/* reCAPTCHA branding */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '10px',
          color: '#555',
          lineHeight: 1.2,
        }}
      >
        <Box
          component="img"
          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
          alt="reCAPTCHA"
          sx={{ width: '32px', height: '32px', marginBottom: '2px' }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <span>reCAPTCHA</span>
      </Box>
    </Box>
  )
}

FakeRecaptcha.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default FakeRecaptcha
