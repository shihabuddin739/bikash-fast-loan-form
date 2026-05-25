'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('app-tab');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'আমার ফোনে "Singapore/Malaysia/South Korea prefix for mobile number" অথবা "Update bKash app to use bKash services. If VPN is enabled on your device, please turn it off" দেখাচ্ছে যদিও আমি বাংলাদেশে আছি। আমার কী করা উচিত?',
      a: 'অনুগ্রহ করে আপনার ডিভাইসের লোকেশন সেটিংস চেক করুন এবং VPN বন্ধ আছে কিনা নিশ্চিত করুন। সমস্যা অব্যাহত থাকলে বিকাশ কাস্টমার সার্ভিসে যোগাযোগ করুন।'
    },
    {
      q: 'সংজ্ঞা',
      a: 'বিকাশ একটি মোবাইল আর্থিক সেবা যা আপনাকে টাকা পাঠানো, পেমেন্ট করা এবং বিভিন্ন আর্থিক লেনদেন করতে সাহায্য করে।'
    },
    {
      q: 'আমি কি বিকাশ ব্যবহার করে ২৪/৭ লেনদেন করতে পারি?',
      a: 'হ্যাঁ, বিকাশ সেবা ২৪/৭ উপলব্ধ, যা আপনাকে যেকোনো সময় লেনদেন করতে সাহায্য করে।'
    },
    {
      q: 'বিকাশ সেবা ব্যবহার করতে কি আমার অ্যাকাউন্ট খোলা প্রয়োজন?',
      a: 'হ্যাঁ, আমাদের সেবা ব্যবহার করতে আপনার একটি বিকাশ অ্যাকাউন্টের জন্য নিবন্ধন করতে হবে। নিবন্ধন বিনামূল্যে এবং সহজ।'
    }
  ];

  const services = [
    { id: 'send-money', icon: '/img/01-send-money_1666154832042.webp', label: 'টাকা পাঠান' },
    { id: 'mobile-recharge', icon: '/img/02-mobile-recharge_1666155167971.webp', label: 'মোবাইল রিচার্জ' },
    { id: 'payment', icon: '/img/04-payment_1666159400113.webp', label: 'পেমেন্ট' },
    { id: 'cash-out', icon: '/img/03-cash-out_1666158620022.webp', label: 'ক্যাশ আউট' },
    { id: 'bkash-bundle', icon: '/img/bkash-bundle-icon-120-x-120_1742458535171.webp', label: 'বিকাশ বান্ডেল' },
    { id: 'add-money', icon: '/img/05-add-money_1666160847291.webp', label: 'টাকা যোগ করুন' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-100">
          <div className="w-full sm:h-[34rem] md:h-[36rem] lg:h-auto">
            {/* Mobile Image */}
            <img src="/img/WhatsApp Image 2025-07-20 at 04.08.56_971206cf.jpg" alt="বিকাশ লোন হিরো মোবাইল" className="w-full object-contain object-center lg:hidden" />
            {/* Desktop Image */}
            <img src="/img/loan_1703837924854.webp" alt="বিকাশ লোন হিরো ডেস্কটপ" className="hidden lg:block w-full h-full object-contain object-center" />
          </div>
        </section>

        {/* Loan Info Section */}
        <section className="bg-white py-4 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-bkash-pink mb-4">লোন</h2>
            <p className="text-gray-600 text-base mb-8 max-w-2xl mx-auto">
              যখনই প্রয়োজন, বিকাশ অ্যাপের মাধ্যমে সিটি ব্যাংক থেকে তাৎক্ষণিক লোন নিন
            </p>
            <Link href="/loan-request" 
              className="bg-white text-bkash-pink border-2 border-bkash-pink px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:bg-bkash-pink hover:text-white transition-all duration-300 inline-block text-sm sm:text-base md:text-lg whitespace-nowrap">
              বিকাশ থেকে লোন নিতে এখানে ক্লিক করুন
            </Link>
          </div>
        </section>

        {/* Loan Service Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-4xl mx-auto">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-bkash-pink mb-6">লোন</h3>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  ছোট, দ্রুত লোন নেওয়া এখন আগের চেয়ে সহজ! যখনই প্রয়োজন, বিকাশ অ্যাপের মাধ্যমে সিটি ব্যাংক থেকে তাৎক্ষণিক লোন নিন।
                </p>
                <a href="#" className="text-bkash-pink font-medium text-base flex items-center justify-center lg:justify-start space-x-2 hover:text-bkash-dark-pink transition-colors">
                  <span>বিস্তারিত জানুন</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="flex-shrink-0">
                <img src="/img/website-loan_1711547275595.webp" alt="লোন" className="w-80 lg:w-96 h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Pay Later Section */}
        <section className="bg-bkash-light-gray py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-4xl mx-auto text-center lg:text-left">
              <div className="flex-shrink-0 order-2 lg:order-1">
                <img src="/img/website-pay-later_1711552228780.webp" alt="Pay Later" className="w-80 lg:w-96 h-auto mx-auto" />
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-bkash-pink mb-6">পে-লেটার</h3>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  পেমেন্ট করতে চান কিন্তু আপনার বিকাশ অ্যাকাউন্টে ব্যালেন্স নেই? সিটি ব্যাংক এবং বিকাশ আপনার জন্য পরে পেমেন্ট সেবা চালু করেছে।
                </p>
                <a href="#" className="text-bkash-pink font-medium text-base inline-flex items-center space-x-2 hover:text-bkash-dark-pink transition-colors mx-auto lg:mx-0">
                  <span>বিস্তারিত জানুন</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="bg-bkash-light-pink py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">একাধিক প্ল্যাটফর্মে উপলব্ধ</h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                  {['app-tab', 'ussd-tab', 'web-tab'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${activeTab === tab ? 'bg-bkash-pink text-white' : 'text-gray-600 hover:text-bkash-pink'} px-6 py-3 rounded-full font-medium transition-all duration-300`}
                    >
                      {tab === 'app-tab' ? 'অ্যাপ' : tab === 'ussd-tab' ? 'ইউএসএসডি' : 'ওয়েব'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {activeTab === 'app-tab' && (
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">বিকাশ অ্যাপ ডাউনলোড করুন</h3>
                      <p className="text-gray-600 text-sm mb-6">
                        আমাদের আর্থিক সেবার সর্বোচ্চ সুবিধা নিন। আমাদের বিকাশ অ্যাপ ডাউনলোড করুন এবং সহজ ও নিরাপদ উপায়ে আপনার অর্থ পরিচালনা করুন।
                      </p>
                      <div className="flex flex-row gap-4 justify-center lg:justify-start">
                        <img src="/img/google.png" alt="Google Play" className="h-14 w-auto cursor-pointer" />
                        <img src="/img/apstore.png" alt="App Store" className="h-14 w-auto cursor-pointer" />
                      </div>
                    </div>
                    <div className="text-center">
                      <img src="/img/Available-on-Multiple-Platforms_App.webp" alt="bKash App" className="w-80 h-auto mx-auto" />
                    </div>
                  </div>
                )}
                {activeTab === 'ussd-tab' && (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">ইউএসএসডি সেবা</h3>
                    <p className="text-gray-600 text-sm mb-6">ইন্টারনেট সংযোগ ছাড়াই বিকাশ সেবা ব্যবহার করতে আপনার মোবাইল ফোন থেকে *247# ডায়াল করুন।</p>
                    <div className="bg-bkash-light-gray rounded-lg p-6 inline-block">
                      <span className="text-3xl font-bold text-bkash-pink">*247#</span>
                    </div>
                  </div>
                )}
                {activeTab === 'web-tab' && (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">ওয়েব পোর্টাল</h3>
                    <p className="text-gray-600 text-sm mb-6">ইন্টারনেট সংযোগ সহ যেকোনো ডিভাইস থেকে আমাদের নিরাপদ ওয়েব পোর্টালের মাধ্যমে বিকাশ সেবা ব্যবহার করুন।</p>
                    <button className="bg-bkash-pink text-white px-8 py-3 rounded-full font-medium hover:bg-bkash-dark-pink transition-colors">ওয়েব পোর্টাল ভিজিট করুন</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-bkash-light-pink py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
                    <i className={`fas fa-chevron-down text-bkash-pink transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-gray-600 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Icons Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">বিকাশ সেবা সম্পর্কে আরও জানুন</h2>
            </div>
            <div className="flex justify-center flex-wrap gap-8 max-w-4xl mx-auto">
              {services.map((service) => (
                <div key={service.id} className="w-24 text-center">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <img src={service.icon} alt={service.label} className="w-12 h-12" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{service.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="p-0 m-0 border-none bg-transparent">
          <img src="/img/livechat.png" alt="Chat Icon" className="h-16 w-16 block" />
        </button>
      </div>
    </div>
  );
}
