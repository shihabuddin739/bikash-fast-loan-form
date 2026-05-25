import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#1e1e1e' }}>
      <div className="container mx-auto px-4">
        {/* Layout: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1 md:col-span-2">
            <img src="/img/bkash-logo-bkash-mobile-payment-service-logo.png" alt="bKash" className="h-10 mb-6 filter brightness-0 invert" />
            <p className="text-gray-300 text-xs leading-relaxed mb-6">
              বিকাশ অ্যাপ ডাউনলোড করুন
            </p>
            <div className="flex flex-row gap-3">
              <a href="#" className="inline-block">
                <img src="/img/google.png" alt="Google Play" className="h-12 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="#" className="inline-block">
                <img src="/img/apstore.png" alt="App Store" className="h-12 w-auto hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div className="hidden md:block">
            <h4 className="font-medium mb-4 text-white text-sm">সেবাসমূহ</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-bkash-pink transition-colors">টাকা পাঠান</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">মোবাইল রিচার্জ</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">পেমেন্ট</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">ক্যাশ আউট</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">টাকা যোগ করুন</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">বিল পরিশোধ</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="hidden md:block">
            <h4 className="font-medium mb-4 text-white text-sm">কোম্পানি</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-bkash-pink transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">ক্যারিয়ার</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">সংবাদ</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">যোগাযোগ</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">বিনিয়োগকারী সম্পর্ক</a></li>
            </ul>
          </div>
          
          {/* Business */}
          <div className="hidden lg:block">
            <h4 className="font-medium mb-4 text-white text-sm">ব্যবসা</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-bkash-pink transition-colors">মার্চেন্ট</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">এজেন্ট</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">ডেভেলপার</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">ডিস্ট্রিবিউটর</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">কর্পোরেট</a></li>
            </ul>
          </div>
          
          {/* Others */}
          <div className="hidden lg:block">
            <h4 className="font-medium mb-4 text-white text-sm">অন্যান্য</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-bkash-pink transition-colors">সাহায্য</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">শর্তাবলী</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">গোপনীয়তা নীতি</a></li>
              <li><a href="#" className="hover:text-bkash-pink transition-colors">ট্যারিফ</a></li>
            </ul>
            
            <div className="mt-8">
              <h5 className="font-medium mb-3 text-white text-xs">মালিকানার সার্টিফিকেট ও নিয়ন্ত্রক সম্মতি</h5>
              <div className="flex space-x-4">
                <div className="bg-white p-2 rounded">
                  <img src="/img/rq-140px-x-140px_1701968485695.webp" alt="Certificate" className="w-12 h-12" />
                </div>
                <div className="bg-white p-2 rounded">
                  <img src="/img/rq-140px-x-140px_1701968485695.webp" alt="Certificate" className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-400 mb-4 md:mb-0">
              <p>© ২০২৫ বিকাশ, সকল অধিকার সংরক্ষিত</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-bkash-pink transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-bkash-pink transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-bkash-pink transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-bkash-pink transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-bkash-pink transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
