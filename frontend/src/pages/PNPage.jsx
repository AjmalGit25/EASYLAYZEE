import UserNavbar from "../components/UserNavbar";


export default function PNPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <UserNavbar/>
      <div className="space-y-3 px-3 pt-15 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold">Privacy Notice</h1>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Introduction</h2>

          <p className="text-[12px] md:text-base">
            At EASYLAYZEE, we value your privacy and are committed to protecting your personal information. This Privacy Notice explains how we collect, use, and safeguard your information.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Information We Collect
          </h2>

          <p className="text-[12px] md:text-base">
            When you use our website, we may collect:
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Personal Information
          </h2>
          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Shipping Address</li>
            <li>Billing Address</li>
          </ul>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Account Information
          </h2>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Username</li>
            <li>Password (stored in encrypted/hashed form)</li>
          </ul>
        </div>


        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Order Information
          </h2>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Products purchased</li>
            <li>Order history</li>
            <li>Payment details (processed securely through payment providers)</li>
          </ul>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Technical Information
          </h2>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>IP Address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Website usage data</li>
          </ul>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            How We Use Your Information
          </h2>

          <p className="text-[12px] md:text-base">
            We use your information to:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Process and deliver orders.</li>
            <li>Manage your account.</li>
            <li>Provide customer support.</li>
            <li>Improve website performance and user experience.</li>
            <li>Send order updates and notifications.</li>
            <li>Prevent fraud and unauthorized activities.</li>
          </ul>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>


        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Sharing Information
          </h2>

          <p className="text-[12px] md:text-base">
            We do not sell your personal information.
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <p>
          We may share information with:
        </p>

        <ul className="list-disc text-[12px] md:text-base pl-5">
          <li>Payment processing providers.</li>
          <li>Shipping and delivery partners.</li>
          <li>Service providers helping operate the website.</li>
          <li>Government authorities when required by law.</li>
        </ul>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Data Security
          </h2>

          <p className="text-[12px] md:text-base">
            We implement reasonable security measures to protect your information from:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Unauthorized access</li>
            <li>Data loss</li>
            <li>Misuse</li>
            <li>Disclosure</li>
          </ul>

          <p className="text-[12px] md:text-base">
            However, no online system can guarantee complete security.
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Cookies</h2>

          <p className="text-[12px] md:text-base">
            EASYLAYZEE may use cookies and similar technologies to:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Remember user preferences.</li>
            <li>Maintain login sessions.</li>
            <li>Improve website functionality.</li>
            <li>Analyze website traffic.</li>
          </ul>

          <p className="text-[12px] md:text-base">
            You can disable cookies through your browser settings, though some features may not function properly.
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Your Rights</h2>

          <p className="text-[12px] md:text-base">
            Depending on applicable laws, you may have the right to:
          </p>

          <ul className="list-disc text-[12px] md:text-base pl-5">
            <li>Access your personal data.</li>
            <li>Correct inaccurate information.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent where applicable.</li>
          </ul>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>


        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">Changes to Privacy Notice</h2>

          <p className="text-[12px] md:text-base">
            We may update this Privacy Notice periodically. Updated versions will be posted on this page with the revised date.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg md:text-2xl font-medium">
            Contact Us
          </h2>

          <p className="text-[12px] md:text-base">
            If you have questions regarding this Privacy Notice, contact us:
          </p>

          <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
        </div>

        <h4 className="text-sm">
          <strong>Email: </strong>
          <a href="mailto:privacy@easylayzee.com" className="text-blue-500 underline">
            privacy@easylayzee.com
          </a>
        </h4>

        <h4 className="text-sm">
          <strong>Website: </strong>
          <a href="https://:www.easylayzee.com" className="text-blue-500 underline">
            www.easylayzee.com
          </a>
        </h4>

        <a href="#" className="text-blue-500 underline text-[11px]">Back to top</a>
      </div>

    </div>
  )
}
