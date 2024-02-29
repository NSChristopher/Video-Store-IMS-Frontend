import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Film from './components/Film';
import Actor from './components/Actor';
import FilmSearch from './components/FilmSearch';
import Customers from './components/Customers';
import Customer from './components/Customer';
import CustomerCreate from './components/CustomerCreate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                    <div class="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/film/:film_id" element={<Film />} />
                            <Route path="/actor/:actor_id" element={<Actor />} />
                            <Route path="/films" element={<FilmSearch />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/customer/:customer_id" element={<Customer />} />
                            <Route path="/customer/create" element={<CustomerCreate />} />
                        </Routes>
                    </div>
            </div>
        </Router>
    );
}

export default App;
