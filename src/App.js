
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Stepper from './components/Stepper';
import Signup from './components/Signup';
import Sellerdetails from './components/Sellerdetails';
import Shopdetails from './components/Shopdetails';
import Productdetails from './components/Productdetails';
import Loginform from './components/Loginform';
import Dashboard from './components/Dashboard';
import Order from './components/Order';
import Congrats from './components/Congrats';
import OrderDetails from './components/Orderdetails';
import Updatedelete from './components/Updatedelete';
import Details from './components/Details';

const steps = ['Signup', 'Personal Details', 'Shop Details', 'Product Details'];

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case '/signup':
        setCurrentStep(0);
        break;
      case '/sellerdetails':
        setCurrentStep(1);
        break;
      case '/shopdetails':
        setCurrentStep(2);
        break;
      case '/productdetails':
        setCurrentStep(3);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      switch (currentStep) {
        case 0:
          navigate('/sellerdetails');
          break;
        case 1:
          navigate('/shopdetails');
          break;
        case 2:
          navigate('/productdetails');
          break;
        default:
          break;
      }
    }
  };

  const renderStepper = () => {
    const stepperPaths = ['/signup', '/sellerdetails', '/shopdetails', '/productdetails'];
    return stepperPaths.includes(location.pathname) ? (
      <Stepper steps={steps} currentStep={currentStep} />
    ) : null;
  };

  return (
    <div>
      {renderStepper()}
      <Routes>
        <Route path="/signup" element={<Signup onNextStep={handleNextStep} />} />
        <Route path="/sellerdetails" element={<Sellerdetails onNextStep={handleNextStep} />} />
        <Route path="/shopdetails" element={<Shopdetails onNextStep={handleNextStep} />} />
        <Route path="/productdetails" element={<Productdetails onNextStep={handleNextStep} />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/order" element={<Order />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/customer" element={<Sellerdetails />} />
        <Route path="/order/:productId" element={<OrderDetails />} />
        <Route path="/updatedelete" element={<Updatedelete />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
