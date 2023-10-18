import React from 'react';
//this affect global because im importing in root layout
// import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import Head from "next/head";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col gap-8 p-8">
                <div className="flex items-center justify-center">
                    <img src="/images/Footerlogo.png" alt="#none" className="w-52 h-14" />
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="service">
                        <p>
                            Service center: 111 - 1111
                            <span>
                                Weekdays: 09:00 am to 6:00 pm<br />
                                Lunch time: 12:00 am to 1:00 pm Closed<br />
                                on Sat/Sun/Holidays
                            </span>
                        </p>
                    </div>
                    <div className="service-text flex flex-col md:flex-row gap-8">
                        <div className="flex flex-wrap gap-8">
                            <span>About Us</span>
                            <span>Terms of service</span>
                            <span>Privacy Statement</span>
                            <span>Information Use</span>
                        </div>
                        <div className="sns flex gap-8">
                            <a href="#none"><i className="bi-facebook text-xl"></i></a>
                            <a href="#none"><i className="bi-instagram text-xl"></i></a>
                            <a href="#none"><i className="bi-twitter text-xl"></i></a>
                            <a href="#none"><i className="bi-youtube text-xl"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sub-text border-t border-white pt-8">
                    <p>
                        Copyright © Music Streaming. All rights reserved.<br />
                        We provide services by subscribing to payment purchase safety (escrow) for safe transactions.
                    </p>
                </div>
            </div>

            <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"/>

            <Head>
                {/* Add the Bootstrap Icons CSS */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
                />
            </Head>
        </footer>
    );
};

export default Footer;
