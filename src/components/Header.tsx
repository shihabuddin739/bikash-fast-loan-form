'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-bkash-pink text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img src="/img/Bkash.png" alt="bKash" className="h-8" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <a href="#" className="flex items-center space-x-1 hover:text-pink-200 transition-colors">
                <span>Personal</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="flex items-center space-x-1 hover:text-pink-200 transition-colors">
                <span>Business</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </a>
            </div>
            <a href="#" className="hover:text-pink-200 transition-colors text-sm">সাহায্য</a>
            <a href="#" className="hover:text-pink-200 transition-colors text-sm">সম্পর্কে</a>
            <a href="#" className="hover:text-pink-200 transition-colors text-sm">ক্যারিয়ার</a>
            <a href="#" className="hover:text-pink-200 transition-colors text-sm">ব্লগ</a>
            <a href="#" className="hover:text-pink-200 transition-colors text-sm">ডেভেলপার</a>
          </nav>
          
          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">ENG</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
            <button className="bg-white text-bkash-pink px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm">
              বিকাশ অ্যাপ নিন
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4 mr-2">
            <span className="bg-white text-red-500 text-xs font-medium px-2 py-1 rounded" style={{ borderRadius: '5px' }}>বিকাশ অ্যাপ</span>
            <button className="text-white" onClick={() => setIsMenuOpen(true)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Mobile Menu Header */}
        <div className="bg-bkash-pink text-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="text-white hover:text-pink-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-arrow-left text-lg"></i>
            </button>
            <img src="/img/Bkash.png" alt="bKash" className="h-6" />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-white text-bkash-pink px-3 py-1 rounded-full text-xs font-medium">বাং</span>
            <span className="text-xs opacity-70">En</span>
            <i className="fas fa-chevron-down text-xs opacity-70"></i>
          </div>
        </div>
        
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full bg-white">
          <div className="pt-4">
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">ব্যক্তিগত</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">ব্যবসায়িক</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">সহায়তা</span>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">সম্পর্কে</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">ক্যারিয়ার</span>
              <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-sm">ব্লগ</span>
            </a>
          </div>
          
          <div className="flex-grow" style={{ minHeight: '40px' }}></div>
          
          <div className="px-6 py-4">
            <p className="text-center text-gray-700 text-sm font-medium mb-3">বিকাশ এক্সপেরিয়েন্স করতে </p>
            <button className="w-full bg-bkash-pink text-white px-6 py-4 rounded-lg font-semibold text-sm hover:bg-bkash-dark-pink transition-colors text-center shadow-md">
              অ্যাপ ডাউনলোড করুন
            </button>
          </div>
          
          <div className="px-6 py-6 border-t border-gray-200 mt-4">
            <p className="text-xs text-gray-500 text-center font-medium">© 2025 bKash, সকল অধিকার সংরক্ষিত</p>
          </div>
        </div>
      </div>
    </header>
  );
}
