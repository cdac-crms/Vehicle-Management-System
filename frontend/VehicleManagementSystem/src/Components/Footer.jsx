import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="text-white py-4 mt-5" style={{ backgroundColor: "#102649" }}>
        <div className="container text-center">
          <h5 className="mb-3">RentARide</h5>
          <p className="mb-1">&copy; {new Date().getFullYear()} RentARide - Vehicle Rental System. All rights reserved.</p>
          <p className="mb-0">Developed as a CDAC project.</p>
        </div>
      </footer>
    </div>
  ) 
}

export default Footer
