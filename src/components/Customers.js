import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCustomers, updateCustomerStatus } from '../services/CustomerService';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [radioValue, setRadioValue] = useState('1');
  const [ updateTrigger, setUpdateTrigger ] = useState(0);

  const radios = [
    { name: 'Active', value: '1' },
    { name: 'Inactive', value: '0' }
  ];

  const handleSearch = useCallback(async () => {
    setCustomers([]);

    const searchedCustomers = await getCustomers(searchTerm, radioValue).catch(() => {
      return [];
    });

    setCustomers(searchedCustomers);
  }, [searchTerm, radioValue]);

  const handleActivation = async (customer_id, active) => {
    await updateCustomerStatus(customer_id, active);
    setUpdateTrigger(updateTrigger + 1);
  }

  // on page load handleSearch is called
  useEffect(() => {
    handleSearch();
  }, [handleSearch, updateTrigger]);

  const handleToggle = (value) => {
    setRadioValue(value, () => handleSearch());
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Search</h2>
      <div className="mb-5">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="row mb-2">
        <div className="col-lg-8">
          <h2>Customers</h2>
        </div>
        <div className="col-sm-2 d-flex justify-content-end">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => handleToggle(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <div className="col-sm-2 d-flex justify-content-end">
          <Link to="/customer/create" className="btn btn-primary">+ Customer</Link>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customer_id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
              {customer.active ? (
                <>
                  <td><Link to={`/customer/${customer.customer_id}`}>Edit</Link></td>
                  <td><button onClick={() => handleActivation(customer.customer_id, "0")}>deactivate</button></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td><button onClick={() => handleActivation(customer.customer_id, "1")}>reactivate</button></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Customers;
