import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../OurFeatures/Features';
import TopDeliveryMen from '../TopDelivery/TopDeliveryMen';
import FAQs from '../FAQs/FAQs';
import TransportationSection from '../TransportationSection/TransportationSection';
import PackageSection from '../PackageSection/PackageSection';
import Discount from '../Discount/Discount';
import { Helmet } from "react-helmet";
import ReturnRefundPolicies from '../ReturnPolicy/ReturnRefundPolicies';



const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Home | Droply</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>

            <div>
                <TransportationSection></TransportationSection>
            </div>

            <div>
                <PackageSection></PackageSection>
            </div>
            <div>
                <Discount></Discount>
            </div>
            <div>
                <TopDeliveryMen></TopDeliveryMen>
            </div>
            
            
            <div className='bg-gray-100'>
                <FAQs></FAQs>
            </div>

            <div>
             <ReturnRefundPolicies></ReturnRefundPolicies>
            </div>


             <div>
             <Features></Features>
            </div>

        </div>
    );
};

export default Home;