'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CreditCard, Truck, ChevronRight, ArrowLeft } from 'lucide-react';

// Enhanced validation schema
const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  paymentMethod: Yup.string().required('Please select a payment method'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? Math.min(subtotal * 0.05, 100) : 0;
  const tax = subtotal * 0.1;
  const totalAmount = (subtotal + shipping + tax).toFixed(2);

  const generateOrderId = (() => {
    let currentId = 11111;
    return () => {
      currentId += 1;
      return currentId.toString().padStart(5, '0');
    };
  })();
  const orderId = generateOrderId();

  const getDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const deliveryDate = getDeliveryDate();

  const getUserDetails = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/getdetails`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  useEffect(() => {
    getUserDetails();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (cb) => {
    setIsProcessing(true);
    setPaymentStatus('Processing');
    toast.loading('Processing payment...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    const { name, email, phone } = userData || {};

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`, {
        amount: totalAmount,
        currency: 'INR',
      });

      const order = data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Voxbuy',
        description: 'Order Payment',
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            toast.success('Payment successful!', {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
            setPaymentStatus('Complete');
            cb('Complete');
          } else {
            toast.error('Payment verification failed!', {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
            setPaymentStatus('Failed');
            cb('Failed');
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: '#800020', // Maroon
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('Failed to initiate payment.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setPaymentStatus('Failed');
      cb('Failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (values) => {
    if (values.paymentMethod === 'card') {
      handlePayment(async (paymentStatus) => {
        await processOrder(values, paymentStatus);
      });
    } else {
      // For Cash on Delivery
      await processOrder(values, 'Pending');
    }
  };

  const processOrder = async (values, status) => {
    const order = {
      user: {
        firstName: userData?.firstName || values.fullName.split(' ')[0],
        lastName: userData?.lastName || values.fullName.split(' ').slice(1).join(' '),
        email: userData?.email || values.email,
        phone: userData?.phone || values.phone,
      },
      shippingAddress: {
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.postalCode,
        country: values.country,
      },
      items: cartItems,
      totalAmount: totalAmount,
      orderNotes: values.orderNotes || '',
      paymentMethod: values.paymentMethod,
      status: status,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/add`, order, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      toast.success('Order placed successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      clearCart();
      router.replace('/user/thankyou');
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Error placing order. Please try again.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  // Step indicator component
  const CheckoutSteps = () => {
    return (
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-4 h-1 bg-gray-700 w-full -z-10"></div>
        {[
          { step: 1, label: 'Cart Details' },
          { step: 2, label: 'Shipping Info' },
          { step: 3, label: 'Payment' }
        ].map(({ step, label }) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 flex items-center justify-center rounded-full z-10 ${
                activeStep >= step ? 'bg-rose-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {step}
            </div>
            <span className={`mt-2 text-sm ${activeStep >= step ? 'text-white' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Order summary component
  const OrderSummary = () => {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white flex items-center">
          <ShoppingBag size={20} className="mr-2" /> Order Summary
        </h2>
        
        <div className="max-h-64 overflow-y-auto mb-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden mr-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">Your cart is empty</p>
          )}
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-700 text-white font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="mt-4 bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center mb-2">
            <Truck size={18} className="text-rose-500 mr-2" />
            <span className="text-white font-medium">Estimated Delivery</span>
          </div>
          <p className="text-gray-300 text-sm">{deliveryDate}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-300 hover:text-white mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Shopping
        </button>
        
        <h1 className="text-3xl font-bold mb-2 text-white">Checkout</h1>
        <p className="text-gray-400 mb-8">Complete your purchase securely</p>
        
        <CheckoutSteps />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Formik
              initialValues={{
                fullName: userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}` : '',
                email: userData?.email || '',
                phone: userData?.phone || '',
                address: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                paymentMethod: '',
                orderNotes: '',
                termsAccepted: false
              }}
              enableReinitialize
              validationSchema={CheckoutSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-6">
                  {/* PERSONAL INFORMATION SECTION */}
                  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                        <Field
                          name="fullName"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="John Doe"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                        <Field
                          name="email"
                          type="email"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="your@email.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                        <Field
                          name="phone"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="(+91) 9876543210"
                        />
                        <ErrorMessage name="phone" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* SHIPPING ADDRESS SECTION */}
                  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                      <Truck size={20} className="mr-2" /> Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-gray-300 text-sm font-medium mb-2">Street Address</label>
                        <Field
                          name="address"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="123 Main Street"
                        />
                        <ErrorMessage name="address" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                        <Field
                          name="city"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="Mumbai"
                        />
                        <ErrorMessage name="city" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                        <Field
                          name="state"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="Maharashtra"
                        />
                        <ErrorMessage name="state" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Postal Code</label>
                        <Field
                          name="postalCode"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="400001"
                        />
                        <ErrorMessage name="postalCode" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                        <Field
                          as="select"
                          name="country"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </Field>
                        <ErrorMessage name="country" component="div" className="text-rose-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* PAYMENT SECTION */}
                  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                      <CreditCard size={20} className="mr-2" /> Payment Method
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer">
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          id="card"
                          className="mr-3 h-4 w-4 accent-rose-500"
                        />
                        <label htmlFor="card" className="flex items-center cursor-pointer">
                          <div className="bg-white rounded p-1 mr-3">
                            <CreditCard size={20} className="text-gray-800" />
                          </div>
                          <div>
                            <p className="font-medium">Online Payment</p>
                            <p className="text-sm text-gray-400">Pay securely with Razorpay</p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center p-4 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer">
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          id="cod"
                          className="mr-3 h-4 w-4 accent-rose-500"
                        />
                        <label htmlFor="cod" className="flex items-center cursor-pointer">
                          <div className="bg-white rounded p-1 mr-3">
                            <ShoppingBag size={20} className="text-gray-800" />
                          </div>
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-400">Pay when you receive your order</p>
                          </div>
                        </label>
                      </div>
                      
                      <ErrorMessage name="paymentMethod" component="div" className="text-rose-500 text-sm" />
                    </div>
                  </div>
                  
                  {/* ADDITIONAL NOTES */}
                  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Additional Information</h2>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Order Notes (Optional)
                      </label>
                      <Field
                        as="textarea"
                        name="orderNotes"
                        rows="3"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Any special instructions for delivery"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="termsAccepted"
                          className="mr-2 h-4 w-4 accent-rose-500"
                        />
                        <span className="text-sm text-gray-300">
                          I agree to the <a href="#" className="text-rose-500 hover:underline">Terms and Conditions</a>
                        </span>
                      </label>
                      <ErrorMessage name="termsAccepted" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing || !formik.isValid}
                    className="w-full flex justify-center items-center py-4 px-6 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-bold transition-colors duration-200"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                    {!isProcessing && <ChevronRight size={20} className="ml-2" />}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
            
            <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-white mb-3">Secure Checkout</h3>
              <p className="text-gray-300 text-sm">
                All transactions are secure and encrypted. Your personal information is never shared with third parties.
              </p>
              <div className="flex justify-between mt-4">
                <div className="bg-white p-1 rounded">
                  <img src="/api/placeholder/40/24" alt="Visa" className="h-6" />
                </div>
                <div className="bg-white p-1 rounded">
                  <img src="/api/placeholder/40/24" alt="Mastercard" className="h-6" />
                </div>
                <div className="bg-white p-1 rounded">
                  <img src="/api/placeholder/40/24" alt="UPI" className="h-6" />
                </div>
                <div className="bg-white p-1 rounded">
                  <img src="/api/placeholder/40/24" alt="Razorpay" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}