import React from 'react';

export default function AboutMyLibrary() {
  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Is MyLibrary Open Source?</div>
      <div className="text-gray-500 text-xs mt-2">
        Yes! MyLibrary is an open-source project designed to make book management and organization easier and more efficient.
      </div>
      <div className="divider mt-2"></div>

      <div className="card">
        <p className="mt-2 text-gray-600">
          MyLibrary includes a powerful category management system, where you can easily manage various book categories. It also provides a robust admin control panel, mod control panel, and a comprehensive ranking system for staff members.
        </p>

        <p className="mt-2 text-gray-600">
          Additionally, it features a dynamic sitemap generator to keep your website well-structured and SEO-friendly, and much more!
        </p>

        <p className="mt-4 text-gray-600">
          For more information about the project and details on how to set it up, please visit the official GitHub repository:
        </p>
        <a href="https://github.com/mydevify/MyLibrary" className="text-blue-500 mt-2 block">
          https://github.com/mydevify/MyLibrary
        </a>
      </div>

      <div className="divider mt-6"></div>

      <p className="font-semibold">
        Check the GitHub repository for more information about the project and its setup instructions!
      </p>
    </div>
  );
}
