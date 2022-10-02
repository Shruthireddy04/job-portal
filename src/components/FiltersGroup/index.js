// import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'

import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {changeRating, activeRatingId} = props
      const onClickRatingItem = () => changeRating(rating.ratingId)

      const ratingClassName =
        activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-image"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderEmployementList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(i => {
      const {changeEmployement, activeEmployementId} = props
      console.log(activeEmployementId)

      const onClickCategoryItem = () => changeEmployement(i.employmentTypeId)
      const isActive = activeEmployementId.filter(j => i.employmentTypeId === j)
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`

      return (
        <li
          className="category-item"
          key={i.employmentTypeId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{i.label}</p>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Type of Employement</h1>
      <ul className="categories-list">{renderEmployementList()}</ul>
    </>
  )

  //   const onEnterSearchInput = event => {
  //     const {enterSearchInput} = props
  //     if (event.key === 'Enter') {
  //       enterSearchInput()
  //     }
  //   }

  //   const onChangeSearchInput = event => {
  //     const {changeSearchInput} = props
  //     changeSearchInput(event.target.value)
  //   }

  //   const renderSearchInput = () => {
  //     const {searchInput} = props
  //     return (
  //       <div className="search-input-container">
  //         <input
  //           value={searchInput}
  //           type="search"
  //           className="search-input"
  //           placeholder="Search"
  //           onChange={onChangeSearchInput}
  //           onKeyDown={onEnterSearchInput}
  //         />
  //         <BsSearch className="search-icon" />
  //       </div>
  //     )
  //   }

  return (
    <div className="filters-group-container">
      <Profile />
      <hr />
      {renderProductCategories()}
      {/* {renderProductCategories()}
      {renderRatingsFilters()} */}
    </div>
  )
}

export default FiltersGroup
