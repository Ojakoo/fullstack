import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ changeFilter }) => {

  const handleChange = (event) => {
    const filter = event.target.value
    changeFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter,
}

export default connect(
  null,
  mapDispatchToProps,
)(Filter)

//using hooks
/*
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(changeFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
*/