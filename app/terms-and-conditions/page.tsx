import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using ReplyRushh ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                ReplyRushh is a social media management platform that allows users to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Connect and manage Instagram accounts</li>
                <li>Sync and organize social media content</li>
                <li>Automate responses and engagement</li>
                <li>Analyze social media performance</li>
                <li>Schedule and manage posts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Be at least 13 years old</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Spam or harass other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access the Service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Social Media Integration</h2>
              <p className="text-gray-700 mb-4">
                When connecting social media accounts:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You must own or have permission to manage the connected accounts</li>
                <li>You remain responsible for all content posted through our Service</li>
                <li>You must comply with the terms of service of connected platforms</li>
                <li>We are not responsible for changes to third-party platform policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are owned by ReplyRushh and are protected by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>International copyright laws</li>
                <li>Trademark laws</li>
                <li>Patent laws</li>
                <li>Other intellectual property rights</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you create and post through our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service, but we do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Uninterrupted access to the Service</li>
                <li>Error-free operation</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Availability during maintenance periods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, ReplyRushh shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, data, use, 
                goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by contacting us or using the account deletion feature.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                via email or through the Service. Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its 
                conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@ReplyRushh.com<br />
                  <strong>Address:</strong> [Your Company Address]<br />
                  <strong>Phone:</strong> [Your Contact Number]
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions 
                will remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
