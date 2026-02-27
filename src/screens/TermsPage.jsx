import React from 'react';
import { Helmet } from 'react-helmet-async'; // თუ არ გაქვთ, წაშალეთ ეს ხაზი და <Helmet> ტეგები

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>წესები და პირობები | N.T.Style</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6 text-center">წესები და პირობები</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. ზოგადი დებულებები</h2>
          <p>წინამდებარე წესები და პირობები არეგულირებს ურთიერთობას მომხმარებელსა და ონლაინ მაღაზია ntstyle.ge-ს (შემდგომში "კომპანია") შორის. ვებ-გვერდის გამოყენებით თქვენ ეთანხმებით ამ პირობებს.</p>
          <ul className="list-disc ml-5 mt-2">
             <li><strong>იურიდიული სახელწოდება:</strong> შპს N.T.Style</li>
             <li><strong>ელ-ფოსტა:</strong> info@ntstyle.ge</li>
             {/* ჩაწერეთ თქვენი მონაცემები */}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. პროდუქციის შეძენა და ანგარიშსწორება</h2>
          <p>ჩვენს ონლაინ მაღაზიაში განთავსებულ პროდუქციაზე ფასები მოცემულია ეროვნულ ვალუტაში - ლარში (GEL). ანგარიშსწორება ხდება უნაღდო ანგარიშსწორების გზით (Visa / Mastercard). გადახდა ხორციელდება დაცული საბანკო სისტემის მეშვეობით.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. მიწოდების სერვისი</h2>
          <p>მიწოდება ხორციელდება მთელი საქართველოს მასშტაბით. მიწოდების ვადები და ღირებულება დამოკიდებულია თქვენს ადგილმდებარეობაზე და შეკვეთის მოცულობაზე.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;