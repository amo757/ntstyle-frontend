import React from 'react';
import { Helmet } from 'react-helmet-async';

const RefundPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>დაბრუნების პოლიტიკა | N.T.Style</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">დაბრუნების პოლიტიკა</h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="font-medium">საქართველოს კანონმდებლობის შესაბამისად, ჩვენ გთავაზობთ პროდუქციის დაბრუნების შესაძლებლობას.</p>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. დაბრუნების ვადა (14 დღე)</h2>
          <p>მომხმარებელს უფლება აქვს, ყოველგვარი საფუძვლის მითითების გარეშე თქვას უარი ონლაინ შეძენილ ნივთზე და დააბრუნოს იგი ჩაბარებიდან <strong>14 კალენდარული დღის</strong> განმავლობაში.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. დაბრუნების პირობები</h2>
          <p>ნივთის დაბრუნება შესაძლებელია, თუ:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>ნივთს შენარჩუნებული აქვს სარეალიზაციო იერსახე.</li>
            <li>შენარჩუნებულია ქარხნული შეფუთვა და ეტიკეტი.</li>
            <li>წარმოდგენილია გადახდის დამადასტურებელი დოკუმენტი.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. თანხის ანაზღაურება</h2>
          <p>ნივთის უკან მიღებისა და შემოწმების შემდეგ, თანხა დაგიბრუნდებათ იმავე ანგარიშზე 14 დღის განმავლობაში.</p>
        </section>
      </div>
    </div>
  );
};

export default RefundPage;