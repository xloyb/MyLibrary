import React from 'react'

const Mydevify = () => {
    return (
        <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
            <div className="text-xl font-semibold inline-block">About MyDevify.com</div>
            <div className='text-gray-500 text-xs mt-2'>
                Welcome to MyDevify, where creativity meets functionality, and innovation transforms ideas into reality.
            </div>
            <div className="divider mt-2"></div>

            <div className='card'>
                <p className="font-semibold mt-4">Innovative Digital Solutions for Your Success</p>
                <p className="mt-2 text-gray-600">
                    At MyDevify, we’re passionate about providing cutting-edge digital services that help elevate your online presence and drive unparalleled success.
                </p>
            </div>

            <div className="divider mt-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Web Development */}
                <div>
                    <h4 className="font-semibold">⭐ Web Development</h4>
                    <p className="text-gray-600">
                        We provide comprehensive web development solutions, encompassing both front-end design and back-end functionality.
                    </p>
                </div>

                {/* SEO */}
                <div>
                    <h4 className="font-semibold">⭐ Search Engine Optimization</h4>
                    <p className="text-gray-600">
                        Boost your site&apos;s daily rankings with both on-page and off-page SEO, ensuring your website ranks high for your targeted keywords.
                    </p>
                </div>

                {/* MyBB Development */}
                <div>
                    <h4 className="font-semibold">⭐ MyBB Development</h4>
                    <p className="text-gray-600">
                        Craft bespoke MyBB themes and plugins, tailored to client specifications for seamless integration into MyBB platforms.
                    </p>
                </div>

                {/* Discord Development */}
                <div>
                    <h4 className="font-semibold">⭐ Discord Development</h4>
                    <p className="text-gray-600">
                        Develop and optimize Discord bots using the Discord.js framework, creating features that meet the specific needs of users and server dynamics.
                    </p>
                </div>

                {/* Hosting */}
                <div>
                    <h4 className="font-semibold">⭐ Hosting</h4>
                    <p className="text-gray-600">
                        Build scalable, secure, and efficient hosting infrastructure to ensure a robust hosting environment for your business.
                    </p>
                </div>

                {/* Security */}
                <div>
                    <h4 className="font-semibold">⭐ 100% Secured</h4>
                    <p className="text-gray-600">
                        Protect your site from attacks with our top-notch security tips and ensure maximum protection for your online presence.
                    </p>
                </div>
            </div>

            <div className="divider mt-6"></div>

            <p className="font-semibold">
                You got the Idea, We&apos;ve got the expertise!
            </p>
            <p className="mt-2 text-gray-600">
                Elevate your brand with our seamless web development services! From user-friendly interfaces to responsive design, we create websites that not only look good but also perform exceptionally well in search engines.
            </p>
            <p></p>
        </div>
    )
}

export default Mydevify