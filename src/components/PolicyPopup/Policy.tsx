import { Button, Modal, Space } from 'antd';
import React, { useState } from 'react';

interface PolicyModalProps {
    onClose?: () => void; // Add this prop
}

const PolicyModal: React.FC<PolicyModalProps> = ({ onClose }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        if (onClose) onClose(); // Call the function when modal opens
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <span onClick={showModal} className='text-[#1d4ed8]'>
                Terms of Service and Privacy Policy
            </span>

            <Modal
                open={isModalVisible}
                afterClose={onClose}
                width={800}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
            >
                <Space direction='vertical'>
                    <div className='text-xl font-semibold'>Terms of Service (ToS)</div>
                    <div className='text-lg font-medium'>1. Introduction</div>
                    <div className='text-base'>
                        Welcome to <span className='text-[#1d4ed8]'>Morata</span>. These Terms of Service
                        (&apos;ToS&apos;) govern your use of our website and services. By accessing or using our site,
                        you agree to comply with and be bound by these ToS. If you do not agree, please do not use our
                        services.
                    </div>
                    <div className='text-lg font-medium'>2. Account Registration</div>
                    <div className='text-base'>
                        To access certain features, you may need to create an account. You agree to provide accurate and
                        complete information during registration and to keep this information up-to-date. You are
                        responsible for maintaining the confidentiality of your account and password and for all
                        activities that occur under your account.
                    </div>
                    <div className='text-lg font-medium'>3. Use of Services</div>
                    <div className='text-base'>
                        You agree to use Morata&apos;s services only for lawful purposes and in accordance with these
                        ToS.
                        <br /> You agree not to: <br /> - Use our services for any illegal or unauthorized purpose.
                        <br /> - Interfere with or disrupt the operation of our website. <br /> - Attempt to gain
                        unauthorized access to any portion of our site.
                    </div>
                    <div className='text-lg font-medium'>4. Product Descriptions</div>
                    <div className='text-base'>
                        We strive to provide accurate product descriptions and availability information. However, we do
                        not warrant that product descriptions or other content are accurate, complete, reliable, or
                        error-free. If a product offered by Morata is not as described, your sole remedy is to return it
                        in unused condition.
                    </div>
                    <div className='text-lg font-medium'>5. Pricing and Payment</div>
                    <div className='text-base'>
                        All prices are subject to change without notice. We reserve the right to correct any pricing
                        errors. Payment must be made in full at the time of purchase. We accept various forms of payment
                        as indicated on our website.
                    </div>
                    <div className='text-lg font-medium'>6. Shipping and Delivery</div>
                    <div className='text-base'>
                        Shipping and delivery times are estimates and may vary. We are not responsible for delays caused
                        by shipping carriers. Title and risk of loss for all products pass to you upon delivery.
                    </div>
                    <div className='text-lg font-medium'>7. Cancel Order</div>
                    <div className='text-base'>
                        You may cancel your order only when the order status is pending. Once the order status changes
                        from pending, cancellations are no longer possible. If you do not confirm the order once
                        it&apos;s delivered, it will automatically be marked as done after 3 days.
                    </div>
                    <div className='text-lg font-medium'>8. Intellectual Property</div>
                    <div className='text-base'>
                        All content on our website, including text, graphics, logos, images, and software, is the
                        property of Morata or its content suppliers and protected by intellectual property laws. You may
                        not use any content without our prior written permission.
                    </div>
                    <div className='text-lg font-medium'>9. Limitation of Liability</div>
                    <div className='text-base'>
                        To the fullest extent permitted by law, Morata shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages arising out of or related to your use of our
                        services or products.
                    </div>
                    <div className='text-lg font-medium'>10. Governing Law</div>
                    <div className='text-base'>
                        These ToS shall be governed by and construed in accordance with the laws of Vietnam, without
                        regard to its conflict of law principles.
                    </div>
                    <div className='text-lg font-medium'>11. Changes to Terms</div>
                    <div className='text-base'>
                        We reserve the right to modify these ToS at any time. Any changes will be effective immediately
                        upon posting on our website. Your continued use of our services after such changes constitutes
                        your acceptance of the new ToS.
                    </div>

                    <div className='text-xl font-semibold'>Privacy Policy</div>
                    <div className='text-lg font-medium'>1. Introduction</div>
                    <div className='text-base'>
                        Morata (&apos;we&apos;, &apos;our&apos;, &apos;us&apos;) is committed to protecting your
                        privacy. This Privacy Policy explains how we collect, use, and share information about you when
                        you use our website and services.
                    </div>
                    <div className='text-lg font-medium'>2. Information We Collect</div>
                    <div className='text-base'>
                        We may collect the following types of information: <br /> - Personal Information: Name, email
                        address, phone number, shipping address, and payment information. <br /> - Usage Information:
                        Information about how you use our website, such as pages visited, time spent on the site, and
                        links clicked. <br /> - Device Information: Information about the device you use to access our
                        site, including IP address, browser type, and operating system.
                    </div>
                    <div className='text-lg font-medium'>3. How We Use Your Information</div>
                    <div className='text-base'>
                        We use your information to: <br /> - Process and fulfill your orders. <br /> - Communicate with
                        you about your orders and our products. <br /> - Improve our website and services. <br /> -
                        Personalize your experience on our site. <br /> - Protect the security of our site and users.
                    </div>
                    <div className='text-lg font-medium'>4. Sharing Your Information</div>
                    <div className='text-base'>
                        We may share your information with: <br /> - Service Providers: Third-party companies that
                        perform services on our behalf, such as payment processing and shipping. <br /> - Legal
                        Compliance: Authorities when required by law or to protect our rights and safety.
                    </div>
                    <div className='text-lg font-medium'>5. Cookies and Tracking Technologies</div>
                    <div className='text-base'>
                        We use cookies and similar tracking technologies to collect usage and device information. You
                        can control the use of cookies through your browser settings.
                    </div>
                    <div className='text-lg font-medium'>6. Data Security</div>
                    <div className='text-base'>
                        We implement appropriate security measures to protect your information from unauthorized access,
                        disclosure, alteration, or destruction.
                    </div>
                    <div className='text-lg font-medium'>7. Your Rights</div>
                    <div className='text-base'>
                        You have the right to access, correct, or delete your personal information. You may also object
                        to the processing of your information and request data portability. To exercise these rights,
                        please contact us at <span className='text-[#1d4ed8]'>moratashop684@gmail.com</span>.
                    </div>
                    <div className='text-lg font-medium'>8. Changes to This Privacy Policy</div>
                    <div className='text-base'>
                        We may update this Privacy Policy from time to time. Any changes will be effective immediately
                        upon posting on our website. Your continued use of our services after such changes constitutes
                        your acceptance of the new Privacy Policy.
                    </div>
                    <div className='text-xl font-semibold'>Contact Us</div>
                    <div className='text-base'>
                        If you have any questions about these ToS, please contact us at{' '}
                        <span className='text-[#1d4ed8]'>moratashop684@gmail.com</span>.
                    </div>
                </Space>
            </Modal>
        </>
    );
};

export default PolicyModal;
