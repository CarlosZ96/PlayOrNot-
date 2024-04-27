import React from 'react'

const Header = () => {
  return (
    <header>
      <div className={'header-container'}>
        <div className={'options'} >
          <div className={'logo'}>
            <h1 className='tittle'>Play Or Not?</h1>
          </div>
          <div className={'options-buttons-container'}>
            <button className={'options-button'}>Category</button>
            <button className={'options-button'}>Reviews</button>
            <button className={'options-button'}>Rankings</button>
          </div>
        </div>
        <button className='LogIn'><img src={LogIn} alt="LogIn" className='Mar' /></button>
      </div>
    </header>
  )
}

export default Header