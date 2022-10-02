import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    imageUrl: '',
    name: '',
    shortBio: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        imageUrl: fetchedData.profile_details.profile_image_url,
        name: fetchedData.profile_details.name,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        imageUrl: updatedData.imageUrl,
        name: updatedData.name,
        shortBio: updatedData.shortBio,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSuccessView = () => {
    const {imageUrl, name, shortBio} = this.state
    return (
      <div className="img-cnt">
        <img src={imageUrl} alt="profile" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-desc">{shortBio}</p>
      </div>
    )
  }

  onRetry = () => {
    this.getProfile()
  }

  getFailureView = () => (
    <div className="btn-cnt">
      <button type="button" className="btn-failure" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  getLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.getLoaderView()

      case apiStatusConstants.success:
        return this.getSuccessView()

      case apiStatusConstants.failure:
        return this.getFailureView()

      default:
        return null
    }
  }

  render() {
    return <div className="profile-img">{this.getProfileView()}</div>
  }
}

export default Profile
