import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function SearchWidget() {

  return (
    <>
      
      <div className="searchbar2">
                  <input type="text"
                         name=""
                         id=""
                         placeholder="Search" />
                  <div className="searchbtn">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
className="icn srchicn"
alt="search-button" />
                   </div>
              </div>

    </>
  );
}

export default SearchWidget;