import React from "react";
import { PenTool, BookOpen, Users, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <div>
      {" "}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Stories
                </span>
              </div>
              <p className="text-gray-600">
                A platform for writers and readers who care about great stories.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Features
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Support
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Writers
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Readers
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Events
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Blog
                </a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">
                  Careers
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Stories. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
