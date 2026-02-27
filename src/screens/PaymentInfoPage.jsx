import React from 'react';
import { Helmet } from 'react-helmet-async';

const PaymentInfoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>გადახდის მეთოდები | N.T.Style</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">გადახდის მეთოდები</h1>
      <div className="space-y-4 text-gray-700">
        <p>ჩვენს საიტზე ანგარიშსწორება ხდება უსაფრთხოდ, თიბისი ბანკის სისტემის მეშვეობით.</p>
        <p>ჩვენ ვიღებთ შემდეგი ტიპის ბარათებს:</p>
        <ul className="list-disc ml-6">
            <li>VISA</li>
            <li>Mastercard</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">თქვენი ბარათის მონაცემები დაცულია და არ ინახება ჩვენს სერვერზე.</p>
      </div>
    </div>
  );
};

export default PaymentInfoPage;