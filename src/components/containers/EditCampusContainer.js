/*==================================================
EditCampusContainer.js
The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './Header'

import EditCampusView from '../views/EditCampusView'
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks'

class EditCampusContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campus: this.props.campus,
      campusId: this.props.match.params.id,
      redirect: false,
      redirectId: null,
    }
  }

  componentDidMount() {
    //getting campus ID from url
    this.props.fetchCampus(this.state.campusId)
  }

  //change state values based on user input
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // handle the submission
  handleSubmit = async (event) => {
    event.preventDefault()
    let campus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageURL: this.state.imageURL,
      id: this.state.campusId,
    }

    let newCampus = await this.props.editCampus(campus)
    console.log(newCampus)
    this.setState({
      name: '',
      imageURL: '',
      address: '',
      description: '',
      redirect: true,
      redirectId: this.state.campusId,
    })
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />
    }
    return (
      <>
        {/*Render the view of the Edit Campus*/}
        <Header />
        <EditCampusView
          campusInfo={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    )
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  }
}

EditCampusContainer.propTypes = {
  fetchCampus: PropTypes.func.isRequired,
  editCampus: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(EditCampusContainer)