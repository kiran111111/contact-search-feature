import React, { useState } from "react";


interface Contact {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    city : string;
    state : string;
    zip :  string;
    dob : string // YYYY-MM-DD;
    address : string;
}

const contacts: Contact[] = [
    {
      id: 1,
      firstname: "Desiree",
      lastname: "Harper",
      email: "shermanangela@gmail.com",
      phone: "9934345355",
      city: "Russellchester",
      state: "GA",
      zip: "35323",
      dob: "1989-10-24",
      address: "Unit 9459 Box 8886, DPO AE 13590",
    },
    {
      id: 2,
      firstname: "Sarah",
      lastname: "Martin",
      email: "xrojas@james-king.com",
      phone: "2345435435",
      city: "Port Adam",
      state: "TN",
      zip: "97341",
      dob: "2007-09-04",
      address: "9774 Kaitlyn Ports, Chambersshire, OK 83321",
    },
    {
      id: 3,
      firstname: "Jackie",
      lastname: "Floyd",
      email: "saraelliott@gmail.com",
      phone: "23423423432",
      city: "South Nicoleshire",
      state: "AK",
      zip: "66576",
      dob: "1924-11-09",
      address: "PSC 3383, Box 0689, APO AP 33453",
    },
    {
      id: 4,
      firstname: "Jennifer",
      lastname: "Ryan",
      email: "hesterelizabeth@pineda.com",
      phone: "2342342344",
      city: "Shorttown",
      state: "CA",
      zip: "05567",
      dob: "1988-04-05",
      address: "884 Patricia Station, Moranchester, VA 62891",
    },
    {
      id: 5,
      firstname: "Jacob",
      lastname: "Jones",
      email: "jthompson@ortega.com",
      phone: "3423423444",
      city: "North Christopher",
      state: "ZZ",
      zip: "50558",
      dob: "1940-02-12",
      address: "5847 Joshua Mountain Suite 168, West Laura, NY 28130",
    },
    {
      id: 6,
      firstname: "Christopher",
      lastname: "Elliott",
      email: "alisha92@fisher-davis.com",
      phone: "23423423423",
      city: "Lake Jeremystad",
      state: "NZ",
      zip: "20469",
      dob: "1942-06-09",
      address: "382 Allen Mountains Suite 053, West Pamelaborough, IA 80021",
    },
    {
      id: 7,
      firstname: "Gregory",
      lastname: "Rodriguez",
      email: "gwagner@clark-glenn.info",
      phone: "2342342342",
      city: "Daltonton",
      state: "ZP",
      zip: "57384",
      dob: "1937-08-30",
      address: "197 Park Plaza, Lake Gregoryside, IA 18858",
    },
    {
      id: 8,
      firstname: "Kevin",
      lastname: "Villarreal",
      email: "justin63@gmail.com",
      phone: "234234234324",
      city: "Thomasburgh",
      state: "PL",
      zip: "72062",
      dob: "1989-11-29",
      address: "69426 Carpenter Junction Apt. 800, Lake Nancy, WI 61556",
    },
    {
      id: 9,
      firstname: "Hector",
      lastname: "Graves",
      email: "sarahbarrera@yahoo.com",
      phone: "2342342342",
      city: "Jeffreymouth",
      state: "NY",
      zip: "65927",
      dob: "1981-03-29",
      address: "936 Thompson Crescent, Huntermouth, ND 16809",
    },
    {
      id: 10,
      firstname: "Audrey",
      lastname: "Lawson",
      email: "jeffreyhiggins@gibson.info",
      phone: "823424234234",
      city: "East Kristi",
      state: "NH",
      zip: "76164",
      dob: "1967-01-16",
      address: "86586 Walls Flats, East Deborah, IN 90395",
    },
  ];
  
    

const ContactPage: React.FC = () => {


    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const handleRowSelect = (id: number) => {
      setSelectedContactId((prev) => (prev === id ? null : id)); // Toggle selection
    };
    const selectedContact = contacts.find((contact) => contact.id === selectedContactId);


    const [filters, setFilters] = useState({
        firstname: "",
        dob : "",
        lastname : '',
        email : '',
        phone : '',
        address : '',
        city : '',
        state : '',
        zipcode : ''
      });
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

    // Handle input change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    // Filter contacts on Search
    const handleSearch = () => {
        const newFilteredContacts = contacts.filter((contact) =>
            (!filters.firstname || contact.firstname.toLowerCase().startsWith(filters.firstname.toLowerCase())) &&
            (!filters.lastname || contact.lastname.toLowerCase().startsWith(filters.lastname.toLowerCase())) &&
            (!filters.dob || contact.dob === filters.dob) && // Match exact DOB
            (!filters.email || contact.email.toLowerCase().startsWith(filters.email.toLowerCase())) &&
            (!filters.phone || contact.phone.startsWith(filters.phone)) && 
            (!filters.address || contact.address.toLowerCase().startsWith(filters.address.toLowerCase())) &&
            (!filters.city || contact.city.toLowerCase().startsWith(filters.city.toLowerCase())) &&
            (!filters.state || contact.state.toLowerCase().startsWith(filters.state.toLowerCase())) &&
            (!filters.zipcode || contact.zip.startsWith(filters.zipcode))
        );
        setFilteredContacts(newFilteredContacts);

            // Reset the page to 1 if the filtered results do not fit the current page
        if (newFilteredContacts.length < (currentPage - 1) * rowsPerPage + 1) {
            setCurrentPage(1);
        }
    };
    


    // Calculate pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredContacts.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil( (filteredContacts.length / rowsPerPage) );

    // Pagination handler
    const handlePageChange = (page : number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <div>
            <h1>Contact Page</h1>
            <h2>Choose a Contact</h2>
            <h3>Search for a Contact</h3>

            {/* Filters */}
            <div className="filter-container">
                {/* Left Filters */}
                <div className="filter-container-left">
                    <div className="filter-rows">
                        <div className="filters">
                            <label>First Name</label>
                            <input
                               name="firstname"
                               type="text" placeholder="Filter by First Name"
                               value={filters.firstname}
                               onChange={handleFilterChange}
                             />
                        </div>
                        <div className="filters">
                            <label>Last Name</label>
                            <input name="lastname" type="text" placeholder="Filter by Last Name" 
                             value={filters.lastname}
                             onChange={handleFilterChange}
                             />
                        </div>
                        <div className="filters">
                            <label>Date of Birth</label>
                            <input name="dob" type="date" placeholder="Filter by date"
                                value={filters.dob}
                                onChange={handleFilterChange}
                             />
                        </div>
                    </div>
                    <div className="filter-rows">
                        <div className="filters">
                            <label>Email Address</label>
                            <input type="text" placeholder="Filter by Email" 
                             name="email" value={filters.email}
                             onChange={handleFilterChange}
                            />
                        </div>
                        <div className="filters">
                            <label>Phone number</label>
                            <input type="text" placeholder="Filter by Phone Number"
                              name="phone" value={filters.phone}
                              onChange={handleFilterChange}
                             />
                        </div>
                    </div>
                </div>
                {/* Right Filters */}
                <div className="filter-container-right">
                    <div className="filter-rows">
                        <div  className="filters">
                            <label> Street Address</label>
                            <input
                                type="text"
                                style={{  width : '600px' }}
                                placeholder="Filter by address"
                                name="address" value={filters.address}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter-rows">
                        <div className="filters">
                            <label>City</label>
                            <input type="text" placeholder="Filter by city" 
                               name="city" value={filters.city}
                               onChange={handleFilterChange}
                             />
                        </div>
                        <div className="filters">
                            <label>State</label>
                            <select style={{border : '1px solid black'}} name="state" id="state" 
                               value={filters.state}
                               onChange={handleFilterChange}
                            >
                                    <option value="">Select State</option> {/* Default placeholder option */}
                                    <option value="GA">GA</option>
                                    <option value="TN">TN</option>
                                    <option value="AK">AK</option>
                                    <option value="CA">CA</option>
                                    <option value="ZZ">ZZ</option>
                                    <option value="NZ">NZ</option>
                                    <option value="ZP">ZP</option>
                                    <option value="PL">PL</option>
                                    <option value="NY">NY</option>
                            </select>
                        </div>
                        <div className="filters">
                            <label>Zipcode</label>
                            <input
                                type="text"
                                placeholder="Filter by zipcode"
                                name="zipcode" value={filters.zipcode}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>

            </div>


            {/* Button to filter results  */}
            <button onClick={handleSearch}>Search</button>

            {/* Table */}
            <div>
                <table style={{width : '100%'}}>
                    <thead>
                        <tr style={{ textAlign : 'left' }}>
                            <th></th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map(contact => (
                            <tr style={{ textAlign : 'left' }} key={contact.id}  >
                                <td>
                                   <input
                                        type="checkbox" style={{ transform : 'scale(1.5)' }}
                                        checked={selectedContactId === contact.id}
                                        onChange={() => handleRowSelect(contact.id)}
                                    />
                                </td>
                                <td>{contact.firstname + " " + contact.lastname}</td>
                                <td>{contact.dob}</td>
                                <td>{contact.address}</td>
                                <td>{contact.city}</td>
                                <td>{contact.state}</td>
                                <td>{contact.zip}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div
                style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                }}
            >
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        fontSize: "30px",
                        color :"gray"
                    }}
                >
                     &#x276E; {/* Left flat arrow */}
                </button>
                <div
                    style={{
                        padding: "10px 16px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                    }}
                >
                    {currentPage}
                </div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        fontSize: "30px",
                        color :"gray"
                    }}
                >
                     &#x276F; {/* Right flat arrow */}
                </button>
            </div>


           {/* Selected Contact */}
           <h2>Selected Contact</h2>
           {selectedContact ? (
              <>
                <p> Name :  {selectedContact?.firstname +  " " + selectedContact?.lastname} </p>
                <p> Email : {selectedContact?.email}</p>
                <p> Phone : {selectedContact?.phone}</p>
                <p> Address : {selectedContact?.address}</p>
              </>
           ) : "None"}
           

        </div>
    );
};

export default ContactPage;
