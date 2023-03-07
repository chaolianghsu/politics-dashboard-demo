import PropTypes from 'prop-types'
import { Tab as MuiTab, Tabs as MuiTabs, styled } from '@mui/material'

const CustomTab = styled(MuiTab)({
  minWidth: '160px',
  color: 'rgb(132, 159, 180)',
  '&.Mui-selected': {
    backgroundColor: 'rgb(75, 194, 255)',
    color: 'white',
  },
})

const TabPropTypes = {
  tabValue: PropTypes.number,
  tabOnChange: PropTypes.func,
  tabNames: PropTypes.arrayOf(PropTypes.string),
}

function Tab({ tabValue, tabOnChange, tabNames }) {
  return (
    <MuiTabs
      value={tabValue}
      onChange={tabOnChange}
      indicatorColor=""
      sx={{
        '& .MuiTabs-flexContainer': {
          overflow: 'auto hidden',
          width: '100%',
        },
      }}
    >
      {tabNames.map((item) => <CustomTab label={item} key={item} />)}
    </MuiTabs>
  )
}

Tab.propTypes = TabPropTypes

export default Tab
