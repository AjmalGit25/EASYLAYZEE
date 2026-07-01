
import UserNavbar from "../components/UserNavbar.jsx";


function COUPage() {
  return (
    <div className="min-h-screen">

      <UserNavbar />

      <div className="space-y-4 px-3 pt-15">
        <h1 className="text-2xl md:text-3xl font-bold">Conditions of Use</h1>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Welcome to EASYLAYZEE</h2>
          <p className="text-[12px] md:text-base">
            Welcome to EASYLAYZEE. By accessing or using our website, you agree to comply with and be bound by these Conditions of Use. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Use of Our Services
          </h2>

          <p className="text-[12px] md:text-base">
            You may use EASYLAYZEE only for lawful purposes and in accordance with these terms. You agree not to:
          </p>
        </div>

        <ul className="list-disc text-[12px] md:text-base pl-5">
          <li>Use the website for any fraudulent activity.</li>
          <li>Attempt to gain unauthorized access to our systems.</li>
          <li>Interfere with the proper functioning of the website.</li>
          <li>Submit false or misleading information.</li>
        </ul>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Account Responsibility
          </h2>

          <p className="text-[12px] md:text-base">
            When creating an account, you are responsible for:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Providing accurate and complete information.</li>
            <li>Maintaining the confidentiality of your login credentials.</li>
            <li>All activities that occur under your account.</li>
          </ul>

          <p className="text-[12px] md:text-base">
            EASYLAYZEE reserves the right to suspend or terminate accounts that violate these terms.
          </p>
        </div>


        <div className="space-y-1">
          <h2 className="text-lg sm:text-2xl font-medium">
            Product Information
          </h2>

          <p className="text-[12px] md:text-base">
            We strive to ensure that all product descriptions, images, pricing, and availability information are accurate. However:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Product images may vary slightly from actual products.</li>
            <li>Prices and availability may change without prior notice.</li>
            <li>We reserve the right to correct any errors or inaccuracies.</li>
          </ul>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Orders and Payments</h2>

          <p className="text-[12px] md:text-base">
            By placing an order, you agree that:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>All information provided during checkout is accurate.</li>
            <li>Payment must be completed before order processing (unless Cash on Delivery is offered).</li>
            <li>EASYLAYZEE may cancel orders suspected of fraud or misuse.</li>
          </ul>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Intellectual Property
          </h2>

          <p className="text-[12px] md:text-base">
            All content on EASYLAYZEE, including:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Logos</li>
            <li>Images</li>
            <li>Product descriptions</li>
            <li>Website design</li>
            <li>Graphics and text</li>
          </ul>

          <p className="text-[12px] md:text-base">
            is the property of EASYLAYZEE and may not be copied, reproduced, or distributed without permission.
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Limitation of Liability
          </h2>

          <p className="text-[12px] md:text-base">
            EASYLAYZEE shall not be liable for:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Indirect or incidental damages.</li>
            <li>Temporary website downtime.</li>
            <li>Delays caused by shipping partners.</li>
            <li>Losses arising from misuse of the website.</li>
          </ul>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-medium">
            Changes to Terms
          </h2>

          <p className="text-[12px] md:text-base">
            We may update these Conditions of Use at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Contact Us
          </h2>

          <p className="text-[12px] md:text-base">
            For questions regarding these Conditions of Use, please contact us at:
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <h4 className="text-sm">
          <strong>Email: </strong>
          <a className="text-blue-500 underline" href="mailto:support@easylayzee.com">support@easylayzee.com</a>
        </h4>

        <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
      </div>
    </div>
  )
}

export default COUPage
