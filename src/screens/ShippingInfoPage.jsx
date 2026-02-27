import React from 'react';
import { Helmet } from 'react-helmet-async';

const ShippingInfoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>მიწოდების პირობები | N.T.Style</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">მიწოდების პირობები</h1>
      <div className="space-y-4 text-gray-700">
        <h3 className="text-xl font-semibold">სტანდარტული მიწოდება</h3>
        <p>მიწოდება ხორციელდება მთელი საქართველოს მასშტაბით. თბილისში მიწოდების ვადაა 1-2 სამუშაო დღე, ხოლო რეგიონებში 3-5 სამუშაო დღე.</p>
        
        <h3 className="text-xl font-semibold">მიწოდების ღირებულება</h3>
        <ul className="list-disc ml-6">
            <li>თბილისი: 5 ლარი (100 ლარზე მეტ შენაძენზე უფასო)</li>
            <li>რეგიონები: 7 ლარი</li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingInfoPage;