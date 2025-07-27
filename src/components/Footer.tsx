import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-4 mt-auto">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p>&copy; {new Date().getFullYear()} Kontext. All rights reserved.</p>
                    <div className="flex space-x-4 mt-2">
                        <a
                            href="/terms"
                            className="hover:text-gray-300"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/privacy"
                            className="hover:text-gray-300"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaGithub className="text-2xl" />
                    </a>
                    <a
                        href="https://twitter.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaTwitter className="text-2xl" />
                    </a>
                    <a
                        href="https://linkedin.com/in/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
